
const hasPermission = require('../../utils/user/hasPermission');
const { deleteItem } = require('../../utils/s3');

module.exports = async (req, res) => {
  try {
    const { key } = req.query;
    // const perms = await hasPermission(req.user._id, 'media', 'delete');
    // if (!perms) return res.json({ error: 'invalid permissions' });
    const del = await deleteItem({ Key: key })
    return res.json({ success: true });
  } catch (e) {
    console.log('delete media ', e);
    return res.json({ error: 'create data error' });
  }
};
