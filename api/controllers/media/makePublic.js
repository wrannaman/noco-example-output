
const hasPermission = require('../../utils/user/hasPermission');
const { getPresignedURL, putObjectACL } = require('../../utils/s3');
const uuid = require('uuid').v4;

module.exports = async (req, res) => {
  try {
    const { key } = req.query;
    // const perms = await hasPermission(req.user._id, 'media', 'get');
    // if (!perms) return res.json({ error: 'Invalid Permission' });

    await putObjectACL(key)
    return res.json({ success: true });
  } catch (e) {
    console.error('get media public ', e);
    return res.json({ error: 'get media error' });
  }
};