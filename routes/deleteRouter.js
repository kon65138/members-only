const { Router } = require('express');
const { isAdmin } = require('../middleware/authMiddleware');
const deleteController = require('../controllers/deleteController.js');

const deleteRouter = Router();

deleteRouter.post('/:id', isAdmin, deleteController.deletePost);

module.exports = deleteRouter;
