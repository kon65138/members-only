const { createUser } = require('../db/queries');
const { genPassword } = require('../lib/passwordUtils');

function genSignUpGet(req, res, next) {
  res.render('genSignUp', {
    errors: false,
    values: {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      username: req.body.username,
      password: req.body.password,
    },
  });
}

async function genSignUpPost(req, res, next) {
  const { salt, hash } = genPassword(req.body.password);
  const user = await createUser({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    hash,
    salt,
    ismember: false,
    isadmin: false,
  });
  // establish a session for the newly created user (calls serializeUser)
  req.login(user, (err) => {
    if (err) return next(err);
    res.redirect('/homepage');
  });
}

module.exports = { genSignUpGet, genSignUpPost };
