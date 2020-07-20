const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";

/*
 * @oas [delete] /email/:id
 * summary: "delete one email"
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
 *     description: "delete one email"
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
    };
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'email', 'delete');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') {
      where.user = req.user.id;
    }
    const deleted = await Email.destroy({
      where
    });

    return res.json({
      success: true,
      email: deleted
    });
  } catch (e) {
    console.error('get one email error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};