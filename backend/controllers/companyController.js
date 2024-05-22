const { Company } = require('../models');

const createCompany = async (req, res) => {
  const { name, description, netSalary } = req.body;

  try {
    const company = await Company.create({ name, description, netSalary });
    res.status(201).json(company);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};


module.exports = {
  createCompany,
  getCompanies,
};
