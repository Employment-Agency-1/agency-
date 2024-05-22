const express = require('express');
const { createCompany, getCompanies } = require('../controllers/companyController');

const router = express.Router();

router.post('/companies', createCompany);
router.get('/companies', getCompanies);

module.exports = router;
