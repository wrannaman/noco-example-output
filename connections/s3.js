const aws = require('aws-sdk');
const { s3 } = require('../config');

const opts = {
  accessKeyId: s3.key,
  secretAccessKey: s3.secret,
  region: 'us-east-1',
  // bucket: s3.bucket,
  sslEnabled: s3.sslEnabled || true,
  endpoint: s3.endpoint
};

if (s3.s3ForcePathStyle) opts.s3ForcePathStyle = s3.s3ForcePathStyle;
if (s3.signatureVersion) opts.signatureVersion = s3.signatureVersion;

const s3Instance = new aws.S3(opts);
module.exports = s3Instance;
