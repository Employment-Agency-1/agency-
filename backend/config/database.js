const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite', // SQLite is the database engine being used here
  storage: './database.sqlite', // file path where the SQLite database file will be stored => in the backend called database.sqlite
});
// we basically initialize a connection to a SQLite database using Sequelize 

module.exports = sequelize;
