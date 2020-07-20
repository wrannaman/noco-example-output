const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";
/*
 * @oas [get] /email/:id
 * summary: "get one email"
 * tags: ["email"]
 * parameters:
 *   - name: 'id'
 *     in: 'path'
 *     description: id of the email
 *     schema:
 *       type: 'string'
 *       example: "123456"
 * responses:
 *   "200":
 *     description: "get one email"
 *     schema:
 *       type: "Email"
 */
module.exports = async (req, res) => {
  const Email = global.DB.models.email;
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
      perm = await hasPermission(req.user, 'email', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    let query = await Email.findOne({
      where
    });



    return res.json({
      success: true,
      email: query
    });
  } catch (e) {
    console.error('get one email error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};