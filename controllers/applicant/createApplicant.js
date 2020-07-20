const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "public";
/*
 * @oas [post] /applicant
 * summary: "create a applicant"
 * tags: ["applicant"]
 * parameters:
 *   - in: 'body'
 *     name: 'id'
 *     schema:
 *       type: 'number'
 *   - in: 'body'
 *     name: 'email'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'name'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'frontEnd'
 *     schema:
 *       type: 'boolean'
 *   - in: 'body'
 *     name: 'backEnd'
 *     schema:
 *       type: 'boolean'
 *   - in: 'body'
 *     name: 'authorized'
 *     schema:
 *       type: 'boolean'
 *   - in: 'body'
 *     name: 'start'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'resume'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'fullStack'
 *     schema:
 *       type: 'boolean'
 * responses:
 *   "200":
 *     description: "create a applicant"
 *     schema:
 *       type: "Applicant"
 */
module.exports = async (req, res) => {
  const Applicant = global.DB.models.applicant;
  const hasRelation = true;
  try {
    let {
      id,
      email,
      name,
      frontEnd,
      backEnd,
      authorized,
      start,
      resume,
      fullStack
    } = req.body;
    const errors = [];
    // required fields

    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof frontEnd !== 'undefined' && typeof frontEnd !== "boolean") errors.push('Invalid frontEnd.');
    if (typeof backEnd !== 'undefined' && typeof backEnd !== "boolean") errors.push('Invalid backEnd.');
    if (typeof authorized !== 'undefined' && typeof authorized !== "boolean") errors.push('Invalid authorized.');
    if (typeof start !== 'undefined' && typeof start !== "string") errors.push('Invalid start.');
    if (typeof resume !== 'undefined' && typeof resume !== "string") errors.push('Invalid resume.');
    if (typeof fullStack !== 'undefined' && typeof fullStack !== "boolean") errors.push('Invalid fullStack.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'applicant', 'create');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    const newItem = {
      id,
      email,
      name,
      frontEnd,
      backEnd,
      authorized,
      start,
      resume,
      fullStack
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

    const newApplicant = await Applicant.create(newItem);

    // now add relations with this id


    return res.json({
      success: true,
      applicant: newApplicant
    });
  } catch (e) {
    console.error('create applicant error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};