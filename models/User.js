const Sequelize = require('sequelize');
module.exports = (instance) => instance.define('user', {
  email: {
    type: Sequelize.STRING,
    unique: "email",
  },
  role: {
    type: Sequelize.STRING,
  },
  photo: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  code: {
    type: Sequelize.INTEGER,
  },
  expires: {
    type: Sequelize.DATE,
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('now')
  }
}, {
  tableName: 'user',
  timestamps: true,
});