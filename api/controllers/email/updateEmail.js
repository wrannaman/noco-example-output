const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";

/*
 * @oas [put] /email/:id
 * summary: "update one email"
 * tags: ["email"]
 * parameters: 
 *   - in: path
 *     name: id
 *     description: id
 *     schema:
 *       type: integer
 *   - in: 'body'
 *     name: 'id'
 *     schema:
 *       type: 'number'
 *   - in: 'body'
 *     name: 'email'
 *     schema:
 *       type: 'string'
 */
module.exports = async (req, res) => {
  const Email = global.DB.models.email;
  try {
    const {
      id
    } = req.params;
    let {
      email
    } = req.body
    const errors = [];
    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
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
      perm = await hasPermission(req.user, 'email', 'update');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    const existing = await Email.findOne({
      where
    });
    if (!existing) return res.json({
      errors: [`email not found with id ${id}`]
    });

    if (typeof email !== 'undefined' && typeof email === "string") existing.email = email;

    await existing.save()

    return res.json({
      success: true,
      email: existing
    });
  } catch (e) {
    console.error('get email error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};