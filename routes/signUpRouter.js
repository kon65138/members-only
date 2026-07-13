const { Router } = require('express');
const signUpController = require('../controllers/signUpController');
const { signUpValidator } = require('../middleware/signUpValidator');
const { validate } = require('../middleware/validate');

const signUpRouter = Router();

signUpRouter.get('/', signUpController.signUpGet);

signUpRouter.post('/', signUpValidator, validate, signUpController.signUpPost);

module.exports = signUpRouter;
