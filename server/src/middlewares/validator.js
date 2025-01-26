const Joi = require("joi");

exports.signupSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(70)
    .required()
    .email({
      tlds: { allow: ["com", "org", "net", "edu"] },
    }),
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
});

exports.signinSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .max(70)
    .required()
    .email({
      tlds: { allow: ["com", "org", "net", "edu"] },
    }),
  password: Joi.string()
    .required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$")),
});
