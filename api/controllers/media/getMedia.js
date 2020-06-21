
const hasPermission = require('../../utils/user/hasPermission');
const { getSignedURL } = require('../../utils/s3');

module.exports = async (req, res) => {
  try {
    const { key } = req.query;
    // const perms = await hasPermission(req.user._id, 'media', 'get');
    // if (!perms) return res.json({ error: 'Invalid Permission' });
    const signed = getSignedURL(key);
    return res.json({ success: true, signed });
  } catch (e) {
    console.error('get media ', e);
    return res.json({ error: 'get media error' });
  }
};