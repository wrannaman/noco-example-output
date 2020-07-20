const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";
/*
 * @oas [get] /company/:id
 * summary: "get one company"
 * tags: ["company"]
 * parameters:
 *   - name: 'id'
 *     in: 'path'
 *     description: id of the company
 *     schema:
 *       type: 'string'
 *       example: "123456"
 * responses:
 *   "200":
 *     description: "get one company"
 *     schema:
 *       type: "Company"
 */
module.exports = async (req, res) => {
  const Company = global.DB.models.company;
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
      perm = await hasPermission(req.user, 'company', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    let query = await Company.findOne({
      where
    });



    return res.json({
      success: true,
      company: query
    });
  } catch (e) {
    console.error('get one company error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};