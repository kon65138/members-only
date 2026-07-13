const { Router } = require('express');

const logoutRouter = Router();

logoutRouter.post('/', (req, res, next) => {
  req.logout((err) => {
    // async in Passport 0.6+
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = logoutRouter;
