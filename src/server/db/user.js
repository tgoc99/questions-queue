const db = require('./db-config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  givenName: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  cohort: Number,
  avatarURL: String,
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
