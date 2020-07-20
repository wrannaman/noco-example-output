const Sequelize = require('sequelize');
module.exports = (instance) => instance.define('company', {
  name: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  email: {
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
  personName: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false,
  },
  howManyHire: {
    type: Sequelize.INTEGER,
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
  tableName: 'company',
  timestamps: true,
});