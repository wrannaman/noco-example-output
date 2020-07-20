const permissions = {
  "email": {
    "create": "always",
    "get": "always",
    "update": "always",
    "delete": "always"
  },
  "user": {
    "create": "always",
    "get": "owned",
    "update": "owned",
    "delete": "never"
  },
  "apiKey": {
    "create": "never",
    "get": "never",
    "update": "never",
    "delete": "never"
  },
  "applicant": {
    "create": "public",
    "get": "always",
    "update": "always",
    "delete": "always"
  },
  "company": {
    "create": "public",
    "get": "always",
    "update": "always",
    "delete": "always"
  }
};
const roles = {
  "admin": {
    "email": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "user": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "apiKey": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "applicant": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "company": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    }
  },
  "user": {
    "email": {
      "create": "always",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "user": {
      "create": "always",
      "get": "owned",
      "update": "owned",
      "delete": "never"
    },
    "apiKey": {
      "create": "never",
      "get": "never",
      "update": "never",
      "delete": "never"
    },
    "applicant": {
      "create": "public",
      "get": "always",
      "update": "always",
      "delete": "always"
    },
    "company": {
      "create": "public",
      "get": "always",
      "update": "always",
      "delete": "always"
    }
  }
};
const roleNames = ["admin", "user"];
const defaultRole = "user";
const auth = {
  "type": "anyone",
  "whitelist": ""
};

module.exports = async ({
  email,
  apiKey
}) => {
  try {
    const User = global.DB.models.user;
    let user = await User.findOne({
      where: {
        email
      }
    });
    const totalUsers = await User.count();
    if (user) user = user.toJSON();
    if (!user && (auth.type === 'anyone' || (auth.type === 'whitelist' && email.indexOf(auth.whitelist) !== -1))) {
      user = await User.create({
        email,
        role: totalUsers === 0 || apiKey ? 'admin' : 'user',
      });
      // reattach a clean user
      user = await User.findOne({
        where: {
          id: user.id
        }
      });
      user = user.toJSON();
    }
    user.permissions = roles[user.role];
    return user;
  } catch (e) {
    console.error('attach user error')
    return {};
  }
};