const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // For password hashing
const validator = require("validator"); // For email validation

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensure email is unique
      trim: true,
      lowercase: true, // Convert email to lowercase
      validate: {
        validator: function (value) {
          return validator.isEmail(value); // Validate email format
        },
        message: "Invalid email address",
      },
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true, // Ensure username is unique
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      select: false, // Exclude password by default when querying
    },
    verified: {
      type: Boolean,
      default: false, // Default to false (user is not verified)
    },
    verificationCode: {
      type: String,
      select: false, // Exclude verification code by default
    },
    verificationCodeExpires: {
      type: Date,
      select: false, // Exclude verification code expiration by default
    },
    forgotPasswordCode: {
      type: String,
      select: false, // Exclude forgot password code by default
    },
    forgotPasswordCodeExpires: {
      type: Date,
      select: false, // Exclude forgot password code expiration by default
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  }
);

//Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Only hash if password is modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password with hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
