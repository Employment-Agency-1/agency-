
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body; //first we destructure(extract) details from req.body
  const hashedPassword = await bcrypt.hash(password, 10); // increasing the number of salt makes the pw more secure but also takes more time to solve
// Bcrypt applies the hashing algorithm to the password combined with the salt 2^10 (1024) times 
  try {
    const user = await User.create({ username, email, password: hashedPassword, role });// the creation is almost the same only the password is hashed
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'User creation failed!' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body; // again w extract the username and password from req body

  try {
    const user = await User.findOne({ where: { username } }); // i made it search/find the username not his email for prefrence
 //handling the case if the user exists or not in our db
    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);//compare the provided password with the stored hashed password Using bycrypt.compare
 // since it returns true or false , we respond only if pw is incorrect else it goes thru as normal
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password!' });
    }
// the jwt.sign() payload contains the data i want to encode into the token
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role },'King Aziz Allows It');
    res.json({ token }); //here we send a response back to the client.the res is the generated JWT as a JSON object { token: 'our generated token } 
  } catch (error) {
    res.status(500).json({ error: 'Login failed!' });
  }
};

// this function gets the number of total users and admins that we then use to see the number of Users in the admin dashboard
const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const userCount = users.filter(user => user.role === 'user').length;
    const adminCount = users.filter(user => user.role === 'admin').length;// used this to check the number of admins but removed it later 
    
    res.status(200).json({ userCount, adminCount }); //return the res back to the client 
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// this get request gets all users that has role:user with attributes 'username', 'email', 'role'
const getAllUsers = async (req, res) => {
  try {
    // Fetch all users with their roles included
    const users = await User.findAll({  
      attributes: ['username', 'email', 'role'], //fetching specific attributes from our table User
      where: {
        role: 'user' // Filter users with role 'user' only
      } 
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// this is to check if email exists when performing signup to check if identical emails exists or not
const checkEmailExists = async (req, res) => {
  try {
    const email = req.query.email; // we retrive the email in the signup using a .query since this is the example we use http://localhost:5000/api/check-email?email=user2@mail.fr
    const user = await User.findOne({ where: { email } });  // now after gettign that email we search it in our User table

    if (user) {
      res.status(200).json({ exists: true }); // if the response is true exists takes a value true
    } else {
      res.status(200).json({ exists: false }); //otherwise it takes false
    }
  } catch (error) { // handling other error cases
    console.error('Error checking email:', error);
    res.status(500).json({ error: 'Failed to check email' });
  }
};




module.exports = {
  signup,
  login,
  getUsers,
  getAllUsers,
  checkEmailExists
};
