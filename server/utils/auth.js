require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');

// Get the secret key from the environment variable
const secretKey = process.env.JWT_SECRET_KEY;

// Generates a JWT token
const generateToken = (userId) => {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

// Verifies a JWT token and extracts the user ID
const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    throw new AuthenticationError('Invalid or expired token');
  }
};

// Authenticates the user with email and password
const authenticateUser = async (email, password) => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Compare the password with the hashed password stored in the database
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError('Invalid email or password');
  }

  // Generate and return a JWT token
  const token = generateToken(user._id);
  return { token, user };
};

module.exports = { generateToken, verifyToken, authenticateUser };
