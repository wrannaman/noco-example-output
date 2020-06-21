const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";
/*
 * @oas [get] /applicant/:id
 * summary: "get one applicant"
 * tags: ["applicant"]
 * parameters:
 *   - name: 'id'
 *     in: 'path'
 *     description: id of the applicant
 *     schema:
 *       type: 'string'
 *       example: "123456"
 * responses:
 *   "200":
 *     description: "get one applicant"
 *     schema:
 *       type: "Applicant"
 */
module.exports = async (req, res) => {
  const Applicant = global.DB.models.applicant;
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
      perm = await hasPermission(req.user, 'applicant', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    let query = await Applicant.findOne({
      where
    });



    return res.json({
      success: true,
      applicant: query
    });
  } catch (e) {
    console.error('get one applicant error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};