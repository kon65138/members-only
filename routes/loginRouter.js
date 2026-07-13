const { Router } = require('express');
const loginController = require('../controllers/loginController');
const passport = require('passport');

const logInRouter = Router();

logInRouter.get('/', loginController.loginGet);

logInRouter.post(
  '/',
  passport.authenticate('local', {
    failureMessage: 'incorrect creds',
    failureRedirect: 'login',
    successMessage: 'successfully logged in',
    successRedirect: 'login',
  }),
);

module.exports = logInRouter;
