const { Router } = require('express');
const genSignUpController = require('../controllers/genSignUpController');
const { genCreds } = require('../middleware/genCredsMiddleware');
const { validate } = require('../middleware/validate');
const { genSignUpValidator } = require('../middleware/genCredValidator');

const genSignUpRouter = Router();

genSignUpRouter.get('/', genCreds, genSignUpController.genSignUpGet);

genSignUpRouter.post(
  '/',
  genSignUpValidator,
  validate('genSignUp'),
  genSignUpController.genSignUpPost,
);

module.exports = genSignUpRouter;
