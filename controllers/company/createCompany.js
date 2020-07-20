const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "public";
/*
 * @oas [post] /company
 * summary: "create a company"
 * tags: ["company"]
 * parameters:
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
 * responses:
 *   "200":
 *     description: "create a company"
 *     schema:
 *       type: "Company"
 */
module.exports = async (req, res) => {
  const Company = global.DB.models.company;
  const hasRelation = true;
  try {
    let {
      id,
      name,
      email,
      frontEnd,
      backEnd,
      personName,
      howManyHire,
      fullStack
    } = req.body;
    const errors = [];
    // required fields

    // validation
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof frontEnd !== 'undefined' && typeof frontEnd !== "boolean") errors.push('Invalid frontEnd.');
    if (typeof backEnd !== 'undefined' && typeof backEnd !== "boolean") errors.push('Invalid backEnd.');
    if (typeof personName !== 'undefined' && typeof personName !== "string") errors.push('Invalid personName.');
    if (typeof howManyHire !== 'undefined' && typeof howManyHire !== "number" && !isNaN(howManyHire)) {
      howManyHire = Number(howManyHire)
    }
    if (typeof howManyHire !== 'undefined' && typeof howManyHire !== "number" && isNaN(howManyHire)) errors.push('Invalid howManyHire.');
    if (typeof fullStack !== 'undefined' && typeof fullStack !== "boolean") errors.push('Invalid fullStack.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'company', 'create');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    const newItem = {
      id,
      name,
      email,
      frontEnd,
      backEnd,
      personName,
      howManyHire,
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

    const newCompany = await Company.create(newItem);

    // now add relations with this id


    return res.json({
      success: true,
      company: newCompany
    });
  } catch (e) {
    console.error('create company error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};