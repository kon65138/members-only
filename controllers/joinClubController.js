const { upgradeToMember } = require('../db/queries');

function joinClubGet(req, res, next) {
  res.render('joinClub', { errors: false });
}

async function joinClubPost(req, res, next) {
  await upgradeToMember(req.user.username);
  res.redirect('homepage');
}

module.exports = { joinClubGet, joinClubPost };
