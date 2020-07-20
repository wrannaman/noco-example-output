const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "never";
/*
 * @oas [get] /apiKey/:id
 * summary: "get one apiKey"
 * tags: ["apiKey"]
 * parameters:
 *   - name: 'id'
 *     in: 'path'
 *     description: id of the apiKey
 *     schema:
 *       type: 'string'
 *       example: "123456"
 * responses:
 *   "200":
 *     description: "get one apiKey"
 *     schema:
 *       type: "ApiKey"
 */
module.exports = async (req, res) => {
  const ApiKey = global.DB.models.apiKey;
  try {
    const {
      id
    } = req.params;
    const errors = [];
    // required fields
    if (!id) errors.push('ID is required in path')
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }

    const where = {
      id
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'apiKey', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    let query = await ApiKey.findOne({
      where
    });



    return res.json({
      success: true,
      apiKey: query
    });
  } catch (e) {
    console.error('get one apiKey error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};