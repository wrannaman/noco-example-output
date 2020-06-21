const s3Instance = require('../../connections/s3');
const { s3 } = require('../../config');

module.exports = (Key) => {
  const time = 60 * 60; // 60 minutes
  let s3Params = {
    Bucket: s3.bucket,
    Key,
    Expires: time,
  };
  const signed = s3Instance.getSignedUrl('getObject', s3Params);
  return signed;
};
