
const { Profile } = require('../models');
//create a new user prfile
const createProfile = async (req, res) => {
  const { name, email, image, age, phone, specialty, yearsOfExperience } = req.body;

  try {
    const profile = await Profile.create({ name, email, image, age, phone, specialty, yearsOfExperience });
    res.status(201).json(profile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Failed to create profile' });
  }
};
// get all profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.status(200).json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Failed to fetch profiles' });
  }
};

module.exports = {
  createProfile,
  getProfiles,
};
