const {
  database
} = require('../config');
const Sequelize = require('sequelize');

const dialectOptions = {
  socketPath: "/cloudsql/seismic-trail-221522:us-central1:noco-dev",
  // supportBigNumbers: true,
  // bigNumberStrings: true
}
let sequelize = new Sequelize(database.database, database.user, database.password, {
  //  host: database.host,
  //  port: database.port,
  dialect: database.dialect,
  dialectOptions,
  directory: false,
  pool: {
    max: 20,
    min: 0,
    idle: 10000,
  },
  logging: false,
});
const working = sequelize.authenticate()
  .then(() => {
    sequelize.sync({
      force: false,
      alter: true
    });
    console.log(`${database.dialect} connected`);
  }).catch(e => {
    console.error(`${database.dialect} Connection error `, e.message);
  })

module.exports = () => {
  return sequelize
};