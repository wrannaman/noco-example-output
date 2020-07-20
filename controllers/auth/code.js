
// const moment = require('moment');
// const { default_from_email, auth: { allowed_origins, issuer } } = require('../../config');
// const { sendMail, mailtext, mailhtml } = require('../../utils/mail');
// const { EmailRegex } = require('../../utils/regex');
// const permissions = {"email":{"create":"always","get":"always","update":"always","delete":"always"},"user":{"create":"always","get":"owned","update":"owned","delete":"never"},"apiKey":{"create":"never","get":"never","update":"never","delete":"never"},"applicant":{"create":"public","get":"always","update":"always","delete":"always"},"company":{"create":"public","get":"always","update":"always","delete":"always"}};
// const roles = {"admin":{"email":{"create":"always","get":"always","update":"always","delete":"always"},"user":{"create":"always","get":"always","update":"always","delete":"always"},"apiKey":{"create":"always","get":"always","update":"always","delete":"always"},"applicant":{"create":"always","get":"always","update":"always","delete":"always"},"company":{"create":"always","get":"always","update":"always","delete":"always"}},"user":{"email":{"create":"always","get":"always","update":"always","delete":"always"},"user":{"create":"always","get":"owned","update":"owned","delete":"never"},"apiKey":{"create":"never","get":"never","update":"never","delete":"never"},"applicant":{"create":"public","get":"always","update":"always","delete":"always"},"company":{"create":"public","get":"always","update":"always","delete":"always"}}};
// const auth = {"type":"anyone","whitelist":""};
// const defaultRole = "user";
// const defaultAdminRole = "admin";
// const randomNumber = require("random-number-csprng");

/*
* @api [get] /code
* description: "Fires off an email with a login code"
* depricated: true
* parameters:
*   - (query) email {String} The email of the user trying to authenticate
* responses:
*   200:
*     success: true
*/

module.exports = async (req, res) => {
  try {
    const User = global.DB.models.user;
    const { origin } = req.headers;
    const { email } = req.query;
    const allowed = allowed_origins.indexOf(origin) !== -1;
    if (!allowed) return res.json({ error: 'Invalid origin' });
    if (!email) return res.json({ error: 'Invalid email' });
    if (!EmailRegex.test(email)) return res.json({ error: 'Invalid email' });

    const code = await randomNumber(1000, 999999);
    const expires = moment().add(5, 'minutes').toDate();

    let user = null;
    user = await User.findOne({ where: { email }});
    const totalUsers = await User.count();
    if (user) {
      user.code = code;
      user.expires = expires;
      await user.save();
    } else {
      if (auth.type === 'anyone' || (auth.type === 'whitelist' && email.indexOf(auth.whitelist) !== -1)) {
        user = await User.create({
          email,
          role: totalUsers === 0 ? defaultAdminRole : defaultRole,
          expires,
          code,
        });
      } else {
        return res.json({ error: 'Unable to create a user.'})
      }
    }
    const txt = mailtext(code, 5);
    const html = mailhtml(code, 5);
    const sent = await sendMail(email, default_from_email, `Log In To ${issuer}`, txt, html);
    return res.json({ success: true });
  } catch (e) {
    return res.json({ error: 'Generate code error ' });
  }
}