const { body } = require('express-validator');

function matchPassword(value) {
  return value === process.env.ADMIN_PASSWORD;
}

const adminValidator = [
  body('password').custom(matchPassword).withMessage('Incorrect password'),
];

module.exports = { adminValidator };
