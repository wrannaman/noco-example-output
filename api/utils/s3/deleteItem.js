const { s3 } = require('../../connections');
module.exports = (params) => new Promise((resolve, reject) => {
  s3.deleteObject(params, (err, data) => {
    if (err) return reject(err);
    else return resolve(data);
  });
});
