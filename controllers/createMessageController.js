const { createMessage } = require('../db/queries');

function createMessageGet(req, res, next) {
  res.render('createMessage', {
    errors: false,
    values: {
      title: false,
      message: false,
    },
  });
}

async function createMessagePost(req, res, next) {
  await createMessage({
    title: req.body.title,
    body: req.body.message,
    author_id: req.user.id, // isAuth guarantees req.user is set
  });
  res.redirect('/homepage');
}

module.exports = { createMessageGet, createMessagePost };
