
const express = require('express');
const { createProfile, getProfiles } = require('../controllers/profileController');

const router = express.Router();

router.post('/profiles', createProfile);
router.get('/profiles', getProfiles);

module.exports = router;
