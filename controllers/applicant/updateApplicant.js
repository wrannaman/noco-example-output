const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";

/*
 * @oas [put] /applicant/:id
 * summary: "update one applicant"
 * tags: ["applicant"]
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
 */
module.exports = async (req, res) => {
  const Applicant = global.DB.models.applicant;
  try {
    const {
      id
    } = req.params;
    let {
      email,
      name,
      frontEnd,
      backEnd,
      authorized,
      start,
      resume,
      fullStack
    } = req.body
    const errors = [];
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

    const where = {
      id
    };
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'applicant', 'update');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    const existing = await Applicant.findOne({
      where
    });
    if (!existing) return res.json({
      errors: [`applicant not found with id ${id}`]
    });

    if (typeof email !== 'undefined' && typeof email === "string") existing.email = email;
    if (typeof name !== 'undefined' && typeof name === "string") existing.name = name;
    if (typeof frontEnd !== 'undefined' && typeof frontEnd === "boolean") existing.frontEnd = frontEnd;
    if (typeof backEnd !== 'undefined' && typeof backEnd === "boolean") existing.backEnd = backEnd;
    if (typeof authorized !== 'undefined' && typeof authorized === "boolean") existing.authorized = authorized;
    if (typeof start !== 'undefined' && typeof start === "string") existing.start = start;
    if (typeof resume !== 'undefined' && typeof resume === "string") existing.resume = resume;
    if (typeof fullStack !== 'undefined' && typeof fullStack === "boolean") existing.fullStack = fullStack;

    await existing.save()

    return res.json({
      success: true,
      applicant: existing
    });
  } catch (e) {
    console.error('get applicant error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};