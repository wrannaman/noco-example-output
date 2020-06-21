const s3Instance = require('../../connections/s3');
const { s3 } = require('../../config');

module.exports =  (Key, makePublic = true) => new Promise((resolve, reject) => {
  const opts = {
    Bucket: s3.bucket,
    Key,
  };
  if (makePublic) opts.ACL = 'public-read';
  s3Instance.putObjectAcl(opts, (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});
