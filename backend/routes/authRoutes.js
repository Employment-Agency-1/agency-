const express = require('express');
const { signup, login ,getUsers,getAllUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/all-users', getAllUsers);
// routes

module.exports = router;
