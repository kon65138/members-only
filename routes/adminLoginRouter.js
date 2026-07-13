const { Router } = require('express');
const adminLoginController = require('../controllers/adminLoginController');
const { adminValidator } = require('../middleware/adminValidator');
const { validate } = require('../middleware/validate');
const { isAuth } = require('../middleware/authMiddleware');

const adminLogInRouter = Router();

adminLogInRouter.get('/', isAuth, adminLoginController.adminLoginGet);

adminLogInRouter.post(
  '/',
  isAuth,
  adminValidator,
  validate('adminLogin'),
  adminLoginController.adminLoginPost,
);

module.exports = adminLogInRouter;
