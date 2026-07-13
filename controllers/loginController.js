function loginGet(req, res, next) {
  res.render('login', { errors: false });
}

module.exports = { loginGet };
