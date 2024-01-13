const Joi = require('joi');

// Validation schema for user signup
const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

// Validation schema for user login
const userLoginSchema = Joi.object({
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

module.exports = {
  validateUserSignup: (data) => userSignupSchema.validate(data),
  validateUserLogin: (data) => userLoginSchema.validate(data),
};
