const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const hasPermission = require('../../utils/user/hasPermission');
const _userPermission = "owned";

/*
 * @oas [get] /users
 * summary: "get users"
 * tags: ["user"]
 * parameters: 
 *   - in: 'query'
 *     name: 'email'
 *     schema:
 *       type: 'string'
 *   - in: 'query'
 *     name: 'role'
 *     schema:
 *       type: 'string'
 *   - in: 'query'
 *     name: 'photo'
 *     schema:
 *       type: 'string'
 *   - in: 'query'
 *     name: 'name'
 *     schema:
 *       type: 'string'
 *   - in: 'query'
 *     name: 'code'
 *     schema:
 *       type: 'number'
 *   - in: 'query'
 *     name: 'expires'
 *     schema:
 *       type: 'string'
 *   - in: query
 *     name: offset
 *     description: offset
 *     schema:
 *       type: integer
 *       default: 0
 *   - in: query
 *     name: limit
 *     description: The numbers of items to return
 *     schema:
 *       type: integer
 *       default: 10
 *   - in: query
 *     name: pageSize
 *     description: The numbers of items to return
 *     schema:
 *       type: integer
 *       default: 10
 */
module.exports = async (req, res) => {
  const User = global.DB.models.user;
  try {
    const {
      email,
      role,
      photo,
      name,
      code,
      expires
    } = req.query;
    let {
      limit,
      offset,
      pageSize,
      page,
      orderBy,
      filters
    } = req.query;

    let order = null;
    let filter = null;
    let constraint = null;
    if (filters) {
      filters = JSON.parse(filters);
      if (Array.isArray(filters)) {
        const ops = [];
        filters.forEach(f => {
          if (!constraint) constraint = {};
          if (f.constraint) {
            return constraint[f.column.field] = isNaN(Number(f.value)) ? f.value : Number(f.value);
          }
          if (f.value) {
            obj = {
              [Op.like]: `%${f.value}%`
            };
            ops.push({
              [f.column.field]: obj
            });
          }
        });
        if (ops.length > 0) filter = {
          [Op.or]: ops
        };
      }
    }
    if (orderBy) {
      orderBy = JSON.parse(orderBy);
      if (orderBy && orderBy.title && orderBy.tableData) {
        order = [
          [orderBy.title, orderBy.tableData.groupSort.toUpperCase()]
        ];
      }
    }

    // default limit of 10
    if (limit && !isNaN(Number(limit))) limit = Number(limit);
    else if (!limit) limit = 10;
    if (pageSize && !isNaN(Number(pageSize))) pageSize = Number(pageSize);
    else if (!pageSize) pageSize = 10;
    if (page && !isNaN(Number(page))) page = Number(page);
    else if (!page) page = 0;
    if (!offset) offset = 0;
    const errors = [];
    // validation
    if (typeof email !== 'undefined' && typeof email !== "string") errors.push('Invalid email.');
    if (typeof role !== 'undefined' && typeof role !== "string") errors.push('Invalid role.');
    if (typeof photo !== 'undefined' && typeof photo !== "string") errors.push('Invalid photo.');
    if (typeof name !== 'undefined' && typeof name !== "string") errors.push('Invalid name.');
    if (typeof code !== 'undefined' && typeof code !== "number") errors.push('Invalid code.');
    if (typeof expires !== 'undefined' && typeof expires !== "string") errors.push('Invalid expires.');
    if (errors.length > 0) {
      res.status(400);
      return res.json({
        errors
      });
    }
    const where = {};
    if (typeof email !== 'undefined') where.email = email;
    if (typeof role !== 'undefined') where.role = role;
    if (typeof photo !== 'undefined') where.photo = photo;
    if (typeof name !== 'undefined') where.name = name;
    if (typeof code !== 'undefined') where.code = code;
    if (typeof expires !== 'undefined') where.expires = expires;


    const find = {
      where
    };
    if (constraint) find.where = Object.assign({}, find.where, constraint);
    if (order) find.order = order;
    if (pageSize !== 'undefined' && typeof pageSize === 'number') find.limit = pageSize;
    else if (typeof limit !== 'undefined' && typeof limit === 'number') find.limit = limit;
    if (typeof offset !== 'undefined' && typeof offset === 'number') find.offset = offset;

    if (typeof pageSize !== 'undefined') {
      find.offset = pageSize * page;
      offset = pageSize * page;
      limit = pageSize;
    }

    if (filter) {
      find.where = Object.assign(find.where, filter);
    }

    let perm = null;
    if (_userPermission !== 'public') {
      perm = await hasPermission(req.user, 'user', 'get');
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
      if (!perm || perm === 'never') {
        return res.json({
          errors: ['Invalid Permission.']
        });
      }
    }

    if (perm && perm === 'owned') {
      find.where.id = req.user.id;
    }


    const query = await User.findAndCountAll(find);
    console.log('FIND', find)

    for (let i = 0; i < query.rows.length; i++) {
      const json = query.rows[i].toJSON();
      query.rows[i] = json;
    }

    return res.json({
      success: true,
      users: query.rows,
      limit: pageSize ? pageSize : limit,
      offset,
      count: query.count
    });

  } catch (e) {
    console.error('get many user error', e);
    res.status(500);
    return res.json({
      errors: [e.message ? e.message : e]
    });
  }
};