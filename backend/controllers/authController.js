// authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signup = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashedPassword, role });
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'User creation failed!' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: 'User not found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password!' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, 'your_jwt_secret');
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed!' });
  }
};


const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const userCount = users.filter(user => user.role === 'user').length;
    const adminCount = users.filter(user => user.role === 'admin').length;
    
    res.status(200).json({ userCount, adminCount });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    // Fetch all users with their roles included
    const users = await User.findAll({ 
      attributes: ['username', 'email', 'role'], 
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




module.exports = {
  signup,
  login,
  getUsers,
  getAllUsers,
};
