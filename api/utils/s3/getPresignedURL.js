const s3Instance = require('../../connections/s3');
const { s3 } = require('../../config');

module.exports = async (Key) => {
  const opts = {
    Bucket: s3.bucket,
    Key,
    Expires: 60 * 5, // 5 minutes
  };
  const url = s3Instance.getSignedUrl('putObject', opts);
  return url;
};
