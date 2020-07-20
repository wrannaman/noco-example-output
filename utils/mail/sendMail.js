
const sgMail = require('@sendgrid/mail');
const { sendgrid, default_from_email } = require('../../config');
sgMail.setApiKey(sendgrid);

module.exports = async (to, from, subject, text, html) => {
  const msg = {
    to,
    from: from || default_from_email,
    subject,
    text,
    html,
  };
  const sent = await sgMail.send(msg);
  return sent;
};
