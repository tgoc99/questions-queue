const mongoose = require('mongoose');
// const config = process.env.MLABUSER ? {
//   user: process.env.MLABUSER,
//   password: process.env.MLABPWORD,
// } : require('../../../config');

mongoose.connect('mongodb://localhost/qqtwo');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;
