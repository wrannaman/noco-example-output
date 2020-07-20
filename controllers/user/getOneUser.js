const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "owned";
/*
 * @oas [get] /user/:id
 * summary: "get one user"
 * tags: ["user"]
 * parameters:
 *   - name: 'id'
 *     in: 'path'
 *     description: id of the user
 *     schema:
 *       type: 'string'
 *       example: "123456"
 * responses:
 *   "200":
 *     description: "get one user"
 *     schema:
 *       type: "User"
 */
module.exports = async (req, res) => {
  const User = global.DB.models.user;
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
      perm = await hasPermission(req.user, 'user', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    let query = await User.findOne({
      where
    });



    return res.json({
      success: true,
      user: query
    });
  } catch (e) {
    console.error('get one user error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};