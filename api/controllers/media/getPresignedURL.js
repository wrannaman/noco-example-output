
const hasPermission = require('../../utils/user/hasPermission');
const { getPresignedURL, putObjectACL } = require('../../utils/s3');
const uuid = require('uuid').v4;

module.exports = async (req, res) => {
  try {
    const { fileName, fileType } = req.query;
    // const perms = await hasPermission(req.user._id, 'media', 'get');
    // if (!perms) return res.json({ error: 'Invalid Permission' });

    let extension = fileName.split('.');
    extension = extension.pop();
    const newFileName = `${uuid()}.${extension}`;

    const presigned = await getPresignedURL(newFileName);
    return res.json({ success: true, presigned, key: newFileName });
  } catch (e) {
    console.error('get media presigned ', e);
    return res.json({ error: 'get media error' });
  }
};