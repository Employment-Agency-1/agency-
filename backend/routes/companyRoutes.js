const express = require('express');
const { createCompany, getCompanies, deleteCompany, updateCompany } = require('../controllers/companyController');

const router = express.Router();

router.post('/companies', createCompany);
router.get('/companies', getCompanies);
router.delete('/companies/:id', deleteCompany);
router.put('/companies/:id', updateCompany);

module.exports = router;
