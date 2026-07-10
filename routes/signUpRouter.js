const { Router } = require('express');

const signUpRouter = Router();

signUpRouter.get('/', (req, res) => res.render('signUp'));

module.exports = signUpRouter;
