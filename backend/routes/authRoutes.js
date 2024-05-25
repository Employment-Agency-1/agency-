const express = require('express');
const { signup, login ,getUsers,getAllUsers,checkEmailExists } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/users', getUsers);
router.get('/all-users', getAllUsers);
router.get('/check-email', checkEmailExists);


module.exports = router;
