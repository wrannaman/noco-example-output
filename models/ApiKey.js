const Sequelize = require('sequelize');
module.exports = (instance) => instance.define('apiKey', {
  key: {
    type: Sequelize.STRING,
    unique: "key",
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
  tableName: 'apiKey',
  timestamps: true,
});