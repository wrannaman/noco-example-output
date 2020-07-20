const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";
/*
 * @oas [post] /user
 * summary: "create a user"
 * tags: ["user"]
 * parameters:
 *   - in: 'body'
 *     name: 'email'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'role'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'photo'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'name'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'code'
 *     schema:
 *       type: 'number'
 *   - in: 'body'
 *     name: 'expires'
 *     schema:
 *       type: 'string'
 * responses:
 *   "200":
 *     description: "create a user"
 *     schema:
 *       type: "User"
 */
module.exports = async (req, res) => {
  const User = global.DB.models.user;
  const hasRelation = true;
  try {
    let {
      email,
      role,
      photo,
      name,
      code,
      expires
    } = req.body;
    const errors = [];
    // required fields

    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof role !== 'undefined' && typeof role !== "string") errors.push('Invalid role.');
    if (typeof photo !== 'undefined' && typeof photo !== "string") errors.push('Invalid photo.');
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof code !== 'undefined' && typeof code !== "number" && !isNaN(code)) {
      code = Number(code)
    }
    if (typeof code !== 'undefined' && typeof code !== "number" && isNaN(code)) errors.push('Invalid code.');
    if (typeof expires !== 'undefined' && typeof expires !== "string") errors.push('Invalid expires.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'user', 'create');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    const newItem = {
      email,
      role,
      photo,
      name,
      code,
      expires
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

    const newUser = await User.create(newItem);

    // now add relations with this id


    return res.json({
      success: true,
      user: newUser
    });
  } catch (e) {
    console.error('create user error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};