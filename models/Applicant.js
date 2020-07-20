const Sequelize = require('sequelize');
module.exports = (instance) => instance.define('applicant', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  frontEnd: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    unique: false,
  },
  backEnd: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    unique: false,
  },
  authorized: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
    unique: false,
  },
  start: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  resume: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: false,
  },
  fullStack: {
    type: Sequelize.BOOLEAN,
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
  tableName: 'applicant',
  timestamps: true,
});