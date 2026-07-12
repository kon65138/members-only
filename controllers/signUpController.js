// controllers/signUpController.js
const { genPassword } = require('../lib/passwordUtils');
const { createUser, findByUsername } = require('../db/queries');

function signUpGet(req, res, next) {
  res.render('signUp');
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
  const result = await findByUsername(user[0].username);
  res.send(`signed in as ${result}`);
}

module.exports = { signUpGet, signUpPost };
