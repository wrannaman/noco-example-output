const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "never";

/*
 * @oas [put] /apiKey/:id
 * summary: "update one apiKey"
 * tags: ["apiKey"]
 * parameters: 
 *   - in: path
 *     name: id
 *     description: id
 *     schema:
 *       type: integer
 *   - in: 'body'
 *     name: 'key'
 *     schema:
 *       type: 'string'
 */
module.exports = async (req, res) => {
  const ApiKey = global.DB.models.apiKey;
  try {
    const {
      id
    } = req.params;
    let {
      key
    } = req.body
    const errors = [];
    // validation
    if (typeof key !== 'undefined' && typeof key !== "string") errors.push('Invalid key.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }

    const where = {
      id
    };
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'apiKey', 'update');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    const existing = await ApiKey.findOne({
      where
    });
    if (!existing) return res.json({
      errors: [`apiKey not found with id ${id}`]
    });

    if (typeof key !== 'undefined' && typeof key === "string") existing.key = key;

    await existing.save()

    return res.json({
      success: true,
      apiKey: existing
    });
  } catch (e) {
    console.error('get apiKey error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};