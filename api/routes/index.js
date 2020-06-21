const user = require('./user.js');
const apiKey = require('./apiKey.js');
const email = require('./email.js');
const applicant = require('./applicant.js');
const company = require('./company.js');
const auth = require('./auth');
const media = require('./media');



module.exports = (app) => {
  app.use(auth);
  app.use(media);


  app.use(user);
  app.use(apiKey);
  app.use(email);
  app.use(applicant);
  app.use(company);
};