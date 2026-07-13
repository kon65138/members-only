const { body } = require('express-validator');

const messageValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 30 })
    .withMessage('Title cannot exceed 30 characters'),
  body('message')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Message too long'),
];

module.exports = { messageValidator };
