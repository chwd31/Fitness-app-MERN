require('dotenv').config();

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;
