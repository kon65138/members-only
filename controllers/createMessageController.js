function createMessageGet(req, res, next) {
  res.render('createMessage', { errors: false });
}

module.exports = { createMessageGet };
