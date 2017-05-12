const db = require('./db-config');
const mongoose = require('mongoose');
const Cohort = require('./cohort.js');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  givenName: { type: String},
  role: { type: String, required: true },
  cohort: { type: String, required: true },
  avatarURL: String,
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
