// controllers/signUpController.js
const { genPassword } = require('../lib/passwordUtils');
const { createUser } = require('../db/queries');

function signUpGet(req, res, next) {
  res.render('signUp', { errors: false, values: {} });
}

async function signUpPost(req, res, next) {
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
  console.log(user);
  res.send(`successfully signed up as ${user.username}`);
}

module.exports = { signUpGet, signUpPost };
