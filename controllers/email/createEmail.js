const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";
/*
 * @oas [post] /email
 * summary: "create a email"
 * tags: ["email"]
 * parameters:
 *   - in: 'body'
 *     name: 'id'
 *     schema:
 *       type: 'number'
 *   - in: 'body'
 *     name: 'email'
 *     schema:
 *       type: 'string'
 * responses:
 *   "200":
 *     description: "create a email"
 *     schema:
 *       type: "Email"
 */
module.exports = async (req, res) => {
  const Email = global.DB.models.email;
  const hasRelation = true;
  try {
    let {
      id,
      email
    } = req.body;
    const errors = [];
    // required fields

    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'email', 'create');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    const newItem = {
      id,
      email
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

    const newEmail = await Email.create(newItem);

    // now add relations with this id


    return res.json({
      success: true,
      email: newEmail
    });
  } catch (e) {
    console.error('create email error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};