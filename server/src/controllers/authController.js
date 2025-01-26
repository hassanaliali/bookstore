const { signupSchema, signinSchema } = require("../middlewares/validator");
const User = require("../models/usersModel");
const { doHash, doHashValidation } = require("../utils/hashing");
const jwt = require("jsonwebtoken");
const transport = require("../middlewares/sendMail");
exports.signup = async (req, res) => {
  const { email, username, password } = req.body;
  try {
    const { error, value } = signupSchema.validate({
      email,
      username,
      password,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await doHash(password, 12);
    console.log(password);
    console.log(hashedPassword);
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    const result = await newUser.save();
    result.password = undefined;
    res.status(201).json({
      success: true,
      message: "Your account has been created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error, value } = signinSchema.validate({
      email,
      password,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res
        .status(401)
        .json({ success: false, message: "User dose not existsing" });
    }
    const result = doHashValidation(password, existingUser.password);
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Password is incurrect" });
    }
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        verfied: existingUser.verfied,
      },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "8h",
      }
    );
    res
      .cookie("Authorization", "Bearer" + token, {
        expires: new Date(Date.now() + 8 * 3600000),
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        success: true,
        token,
        message: "Signin successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

exports.signout = async (req, res) => {
  res
    .clearCookie("Authorization")
    .status(200)
    .json({ success: true, message: "logged out successfully" });
};

exports.sendVerificationCode = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser.email);
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User dose not existsing" });
    }
    if (existingUser.verfied) {
      return res
        .status(400)
        .json({ success: false, message: "You are already verified" });
    }
    const codeValue = Math.floor(Math.random() * 1000000).toString();
    let info = await transport.sendMail({
      from: process.env.MAIL_ADDRESS,
      to: existingUser.email,
      subject: "Verification Code",
      html: "<h1>" + codeValue + "</h1>",
    });
    if (info.accepted[0] === existingUser.email) {
      const hashedCodeValue = hmacProcess(
        codeValue,
        process.env.HMAC_VERIFICATION_CODE_SECRET
      );
      existingUser.verificationCode = hashedCodeValue;
      existingUser.verificationCodeExpires = Date.now();
      await existingUser.save();
      return res.status(200).json({ success: true, message: "code send!" });
    }
    res.status(400).json({ success: false, message: "code send failed!" });
  } catch (error) {
    console.log(error);
  }
};
