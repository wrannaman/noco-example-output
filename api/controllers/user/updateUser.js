const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "owned";

/*
 * @oas [put] /user/:id
 * summary: "update one user"
 * tags: ["user"]
 * parameters: 
 *   - in: path
 *     name: id
 *     description: id
 *     schema:
 *       type: integer
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
 */
module.exports = async (req, res) => {
  const User = global.DB.models.user;
  try {
    const {
      id
    } = req.params;
    let {
      email,
      role,
      photo,
      name,
      code,
      expires
    } = req.body
    const errors = [];
    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof role !== 'undefined' && typeof role !== "string") errors.push('Invalid role.');
    if (typeof photo !== 'undefined' && typeof photo !== "string") errors.push('Invalid photo.');
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof code !== 'undefined' && typeof code !== "number" && !isNaN(code)) {
      code = Number(code)
    }
    if (typeof code !== 'undefined' && typeof code !== "number") errors.push('Invalid code.');
    if (typeof expires !== 'undefined' && typeof expires !== "string") errors.push('Invalid expires.');
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
      perm = await hasPermission(req.user, 'user', 'update');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.id = req.user.id;

    const existing = await User.findOne({
      where
    });
    if (!existing) return res.json({
      errors: [`user not found with id ${id}`]
    });

    if (typeof email !== 'undefined' && typeof email === "string") existing.email = email;
    if (typeof role !== 'undefined' && typeof role === "string") existing.role = role;
    if (typeof photo !== 'undefined' && typeof photo === "string") existing.photo = photo;
    if (typeof name !== 'undefined' && typeof name === "string") existing.name = name;
    if (typeof code !== 'undefined' && typeof code === "number") existing.code = code;
    if (typeof expires !== 'undefined' && typeof expires === "string") existing.expires = expires;

    await existing.save()

    return res.json({
      success: true,
      user: existing
    });
  } catch (e) {
    console.error('get user error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};