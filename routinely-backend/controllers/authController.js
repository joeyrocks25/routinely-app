const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

const registerUser = async (req, res) => {
  try {
    let newUser;

    if (req.body.isGuest) {
      const guestId = uuidv4().slice(0, 8);

      newUser = new User({
        username: `Guest_${guestId}`,
        email: `Guest_${guestId}@example.com`,
        password: guestId, 
        isGuest: true,
      });
    } else {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        isGuest: false,
      });
    }

    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) { 
    res.status(500).json({ error: 'Internal server error' });
  }
};


const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
