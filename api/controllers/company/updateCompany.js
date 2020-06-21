const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "always";

/*
 * @oas [put] /company/:id
 * summary: "update one company"
 * tags: ["company"]
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
 *     name: 'name'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'email'
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
 *     name: 'personName'
 *     schema:
 *       type: 'string'
 *   - in: 'body'
 *     name: 'howManyHire'
 *     schema:
 *       type: 'number'
 *   - in: 'body'
 *     name: 'fullStack'
 *     schema:
 *       type: 'boolean'
 */
module.exports = async (req, res) => {
  const Company = global.DB.models.company;
  try {
    const {
      id
    } = req.params;
    let {
      name,
      email,
      frontEnd,
      backEnd,
      personName,
      howManyHire,
      fullStack
    } = req.body
    const errors = [];
    // validation
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof frontEnd !== 'undefined' && typeof frontEnd !== "boolean") errors.push('Invalid frontEnd.');
    if (typeof backEnd !== 'undefined' && typeof backEnd !== "boolean") errors.push('Invalid backEnd.');
    if (typeof personName !== 'undefined' && typeof personName !== "string") errors.push('Invalid personName.');
    if (typeof howManyHire !== 'undefined' && typeof howManyHire !== "number" && !isNaN(howManyHire)) {
      howManyHire = Number(howManyHire)
    }
    if (typeof howManyHire !== 'undefined' && typeof howManyHire !== "number") errors.push('Invalid howManyHire.');
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
      perm = await hasPermission(req.user, 'company', 'update');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }
    if (perm && perm === 'owned') where.user = req.user.id;

    const existing = await Company.findOne({
      where
    });
    if (!existing) return res.json({
      errors: [`company not found with id ${id}`]
    });

    if (typeof name !== 'undefined' && typeof name === "string") existing.name = name;
    if (typeof email !== 'undefined' && typeof email === "string") existing.email = email;
    if (typeof frontEnd !== 'undefined' && typeof frontEnd === "boolean") existing.frontEnd = frontEnd;
    if (typeof backEnd !== 'undefined' && typeof backEnd === "boolean") existing.backEnd = backEnd;
    if (typeof personName !== 'undefined' && typeof personName === "string") existing.personName = personName;
    if (typeof howManyHire !== 'undefined' && typeof howManyHire === "number") existing.howManyHire = howManyHire;
    if (typeof fullStack !== 'undefined' && typeof fullStack === "boolean") existing.fullStack = fullStack;

    await existing.save()

    return res.json({
      success: true,
      company: existing
    });
  } catch (e) {
    console.error('get company error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};