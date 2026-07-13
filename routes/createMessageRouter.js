const Router = require('express');
const createMessageController = require('../controllers/createMessageController');

const createMessageRouter = Router();

createMessageRouter.get('/', createMessageController.createMessageGet);

module.exports = createMessageRouter;
