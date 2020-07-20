
const { cert_name, auth0_domain } = require('../../config');
const jwt = require('express-jwt');
const { expressJwtSecret } = require('jwks-rsa');

// const publicKey = fs.readFileSync(`../../certs/${cert_name}`);

module.exports = jwt({
  secret: expressJwtSecret({
    jwksUri: `https://${auth0_domain}/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 100,
    cacheMaxEntries: 10,
    // cacheMaxAge: ms('10h')
  }),
  // audience: 'http://myapi/protected',
  issuer: `https://${auth0_domain}/`,
  algorithms: ['RS256']
})

