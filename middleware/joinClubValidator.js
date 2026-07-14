const { body } = require('express-validator');

function matchPassword(value) {
  return value === process.env.CLUB_PASSWORD;
}

const joinClubValidator = [
  body('password').custom(matchPassword).withMessage('Incorrect password'),
];

module.exports = { joinClubValidator };
