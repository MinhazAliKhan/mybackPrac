// middlewares/validateMiddleware.js
const { validationResult } = require("express-validator");
const createError = require('../utils/createError'); // make sure you have this

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Map errors and throw a 400 Bad Request
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));
    return next(createError(400, "Validation failed", formattedErrors));
  }
  next();
};

module.exports = { validate };
