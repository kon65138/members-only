const { deleteMessage } = require('../db/queries');

async function deletePost(req, res, next) {
  await deleteMessage(req.params.id);
  res.redirect('/homepage');
}

module.exports = { deletePost };
