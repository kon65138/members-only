const { Router } = require('express');
const homepageController = require('../controllers/homepageController');

const homepageRouter = Router();

homepageRouter.get('/', homepageController.homepageGet);

module.exports = homepageRouter;
