
const  { User } = require('../models');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const maybeCreateUser = require('../utils/user/maybeCreateUser');
const privateKey = fs.readFileSync(path.join(__dirname, '../certs/private.key'));
module.exports = async (req, res, next) => {
  const ApiKey = global.DB.models.apiKey;

  try {

    if (!req.headers.authorization) return res.json({ error: 'Authorization error' });

    let user = null;
    // if it's an api key
    let token = "";
    if (req.headers.authorization.indexOf('Bearer ') === -1 && req.headers.authorization.length > 0) {
      const key = await ApiKey.findOne({ where: { key: req.headers.authorization } });
      if (!key) throw new Error('invalid api key');
      token = key.key;
      user = await maybeCreateUser({ email: req.headers.authorization, apiKey: true });
      req.user = user;
      return next();
    } else {
      token = req.headers.authorization.replace('Bearer ', '');
    }

    const valid = jwt.verify(token.replace(/\n$/, ''), privateKey);
    console.log('VALID', valid)
    if (!valid.email) throw new Error('no email on jwt');
    user = await maybeCreateUser(valid);
    if (!user) throw new Error('Auth permissions stopped user.')
    req.user = user;
    return next();
  } catch (e) {
    console.log('attach user ', e)
    return res.json({ error: 'Authorization error' });
  }
}
