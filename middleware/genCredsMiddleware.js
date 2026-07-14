const crypto = require('crypto');
const names = require('../public/assets/names.json');

// names.json only has given names (girls/boys), so we draw both the first and
// last name from one combined pool. Built once at module load, not per request.
const namePool = [...names.girls, ...names.boys];

function pick(arr) {
  return arr[crypto.randomInt(arr.length)];
}

function genCreds(req, res, next) {
  const firstName = pick(namePool);
  const lastName = pick(namePool);

  // username = first + last + 4 random digits; the digits make a UNIQUE-column
  // collision unlikely (two users landing on the same name pair)
  const username = `${firstName}${lastName}${crypto.randomInt(1000, 10000)}`;

  const password = crypto.randomBytes(4).toString('hex');

  req.body = {};

  req.body.first_name = firstName;
  req.body.last_name = lastName;
  req.body.username = username;
  req.body.password = password;

  next();
}

module.exports = { genCreds };
