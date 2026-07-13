const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render('signUp', {
      errors: errors.array(),
      values: {
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        username: req.body.username,
        password: req.body.password,
        confirmPassword: req.body.password_confirmation,
      },
    });
  }
  next();
}

module.exports = { validate };
