const sequelize = require('../config/database');
const User = require('./user');
const Company = require('./company');
const Profile = require('./profile'); 

User.sync();
Company.sync();
Profile.sync() 
  .then(() => {
    console.log('Profile table dropped and re-created successfully'); 
  })
  .catch((error) => {
    console.error('Error dropping and re-creating Profile table:', error);//just testing it to check for the error
  });

module.exports = {
  User,
  Company,
  Profile,
};
