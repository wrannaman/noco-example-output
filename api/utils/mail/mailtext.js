const { auth: { issuer } } = require('../../config');

module.exports = (code, expires) => {
  return `
    Your code to log in to ${issuer} is ${code}. It will expire in ${expires} minutes.
  `
}
