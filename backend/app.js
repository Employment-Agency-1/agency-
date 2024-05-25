
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const profileRoutes = require('./routes/profileRoutes');
const sequelize = require('./config/database');
// const User = require('./models/user');
// const Company = require('./models/company');
// const Profile = require('./models/profile'); 

const app = express();

app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', companyRoutes);
app.use('/api', profileRoutes); 

sequelize.sync()
  .then(() => {
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
