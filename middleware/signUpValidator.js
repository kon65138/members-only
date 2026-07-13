const { findByUsername } = require('../db/queries');
const { body } = require('express-validator');

async function isUsernameDuplicate(value) {
  const user = await findByUsername(value);
  if (user) {
    throw new Error('Username already in use');
  }
}

function matchPassword(value, { req }) {
  return value === req.body.password;
}

const signUpValidator = [
  body('first_name').trim().notEmpty().withMessage('First name is required'),
  body('last_name').trim(),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ max: 255 })
    .custom(isUsernameDuplicate),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
  body('password_confirmation')
    .custom(matchPassword)
    .withMessage("Passwords don't match"),
];

module.exports = { signUpValidator };
