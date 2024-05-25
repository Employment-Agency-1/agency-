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
//ilyes 
const deleteCompany = (req, res) => {
  const { id } = req.params;
  Company.destroy({ where: { id } })
    .then(() => {
      return res.status(200).json({ message: 'Company deleted successfully' });
    })
    .catch((error) => {
      console.error('Error deleting company:', error);
      return res.status(500).json({ error: 'Failed to delete company' });
    });
};

const updateCompany = (req, res) => {
  const { id } = req.params;
  const { name, description, netSalary } = req.body;
  
  Company.update(
    { name, description, netSalary },
    { where: { id } }
  )
  .then((rowsUpdated) => { // in then() returned by Sequelize's update() method we find the count of rows that were successfully updated in the database
    if (rowsUpdated[0] === 0) { // checks if no rows were updated during the operation
      return res.status(404).json({ error: 'Company not found' });
    } // else at least one row (company) was successfully updated
    return res.status(200).json({ message: 'Company updated successfully' });
  })
  .catch((error) => {
    console.error('Error updating company:', error);
    return res.status(500).json({ error: 'Failed to update company' });
  });
};

module.exports = {
  createCompany,
  getCompanies,
  deleteCompany,
  updateCompany,
};
