
/* Depricated */

// const { auth: { allowed_origins, issuer, audience, expiresIn } } = require('../../config');
// const fs = require('fs');
// const path = require('path');
// const jwt = require('jsonwebtoken');
// const moment = require('moment');
// const privateKEY = fs.readFileSync(path.join(__dirname, '../../certs/private.key'), 'utf8');
// const publicKEY = fs.readFileSync(path.join(__dirname, '../../certs/public.key'), 'utf8');

/*
 * @api [post] /auth
 * description: "Confirms code a user enters for authentication"
 * deprecated: true
 * parameters:
 *   - (body) email {String} The email of the user trying to authenticate
 *   - (body) code {Number} The code the user entered
 * responses:
 *   200:
 *     success: true
 *     user: The user object
 *     token: String token you can decode and verify in your application
 *     expiresAt: Date in milliseconds when the token expires.
 *   400:
 *     error: The error message
 */

module.exports = async (req, res) => {
  const User = global.DB.models.user;
  const { origin } = req.headers;
  const { email } = req.body;
  let { code } = req.body;
  code = Number(code);
  let user = null;
  user = await User.findOne({ where: { email }});
  if (!user) {
    user.code = 0;
    user.expires = null;
    await user.save();
    return res.json({ error: 'Invalid user' });
  }

  if (isNaN(code)) return res.json({ error: 'Invalid code' });
  const allowed = allowed_origins.indexOf(origin) !== -1;
  if (!allowed) return res.json({ error: 'Invalid origin' });
  if (typeof code !== 'number' || !code) return res.json({ error: 'Invalid code' });

  const signOptions = {
   issuer,
   subject: email,
   audience,
   expiresIn: `${expiresIn}h`,
   algorithm: "RS256"
  };

  if (Number(user.code) !== Number(code)) return res.json({ error: 'Invalid code' });
  user.code = 0;

  const expires = moment().add(expiresIn, 'hours').toDate();
  // generate token
  const token = jwt.sign({
    email,
    userID: user.id,
    expires: user.expires,
    firstName: user.firstName,
    lastName: user.lastName,
    expires
  }, privateKEY, signOptions);

  await user.save();

  // const u = User.create({})
  return res.json({ success: true, user, token, expiresAt: expires.getTime() });
}
