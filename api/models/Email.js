const Sequelize = require('sequelize');
module.exports = (instance) => instance.define('email', {
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
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
  tableName: 'email',
  timestamps: true,
});