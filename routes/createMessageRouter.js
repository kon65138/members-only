const { Router } = require('express');
const createMessageController = require('../controllers/createMessageController');
const { isAuth } = require('../middleware/authMiddleware');
const { messageValidator } = require('../middleware/createMessageValidator');
const { validate } = require('../middleware/validate');

const createMessageRouter = Router();

createMessageRouter.get('/', isAuth, createMessageController.createMessageGet);
createMessageRouter.post(
  '/',
  isAuth,
  messageValidator,
  validate('createMessage'),
  createMessageController.createMessagePost,
);

module.exports = createMessageRouter;
