const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "never";
/*
 * @oas [post] /apiKey
 * summary: "create a apiKey"
 * tags: ["apiKey"]
 * parameters:
 *   - in: 'body'
 *     name: 'key'
 *     schema:
 *       type: 'string'
 * responses:
 *   "200":
 *     description: "create a apiKey"
 *     schema:
 *       type: "ApiKey"
 */
module.exports = async (req, res) => {
  const ApiKey = global.DB.models.apiKey;
  const hasRelation = true;
  try {
    let {
      key
    } = req.body;
    const errors = [];
    // required fields

    // validation
    if (typeof key !== 'undefined' && typeof key !== "string") errors.push('Invalid key.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'apiKey', 'create');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    const newItem = {
      key
    };
    // take care of empty strings in cases where there's an enum;
    Object.keys(newItem).forEach(item => {
      if (!newItem.item) delete newItem.item;
    })
    if (newItem.id) delete newItem.id;

    if (perm && perm === 'owned') {
      newItem.user = req.user.id;
      newItem.userId = req.user.id;
    }

    const newApiKey = await ApiKey.create(newItem);

    // now add relations with this id


    return res.json({
      success: true,
      apiKey: newApiKey
    });
  } catch (e) {
    console.error('create apiKey error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};