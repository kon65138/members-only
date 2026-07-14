const { Router } = require('express');
const joinClubController = require('../controllers/joinClubController');
const { joinClubValidator } = require('../middleware/joinClubValidator');
const { validate } = require('../middleware/validate');
const { isAuth } = require('../middleware/authMiddleware');

const joinClubRouter = Router();

joinClubRouter.get('/', isAuth, joinClubController.joinClubGet);

joinClubRouter.post(
  '/',
  isAuth,
  joinClubValidator,
  validate('joinClub'),
  joinClubController.joinClubPost,
);

module.exports = joinClubRouter;
