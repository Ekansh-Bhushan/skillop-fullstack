// controllers/scoreController.js
const User = require('../models/User');

// Function to get user's current points
const getUserPoints = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ points: user.teamPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching points', error });
  }
};

// Function to add points
const addPoints = async (req, res) => {
  const { points } = req.body;
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.teamPoints += points; // Add points to the user's teamPoints
    await user.save();

    res.status(200).json({ message: 'Points added', points: user.teamPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error adding points', error });
  }
};

// Function to deduct points (when hint is used)
const deductPoints = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.hintUsed) {
      return res.status(400).json({ message: 'Hint already used' });
    }

    user.teamPoints -= 2; // Deduct 2 points
    user.hintUsed = true; // Mark that the hint has been used
    await user.save();

    res.status(200).json({ message: 'Points deducted for hint', points: user.teamPoints });
  } catch (error) {
    res.status(500).json({ message: 'Error deducting points', error });
  }
};

module.exports = { getUserPoints, addPoints, deductPoints };
