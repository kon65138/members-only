const { upgradeToAdmin } = require('../db/queries');

function adminLoginGet(req, res, next) {
  res.render('adminLogin', { errors: false });
}

async function adminLoginPost(req, res, next) {
  await upgradeToAdmin(req.user.username);
  res.redirect('homepage');
}

module.exports = { adminLoginGet, adminLoginPost };
