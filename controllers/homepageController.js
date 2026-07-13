const { getAllMessages } = require('../db/queries');

async function homepageGet(req, res, next) {
  const messages = await getAllMessages();
  res.render('homepage', { messages: messages });
}

module.exports = { homepageGet };
