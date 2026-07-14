const { deleteMessage } = require('../db/queries');

async function deletePost(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    const err = new Error('Message not found');
    err.status = 404;
    return next(err);
  }

  await deleteMessage(id);
  res.redirect('/homepage');
}

module.exports = { deletePost };
