const mongoose = require('mongoose');
// const config = process.env.MLABUSER ? {
//   user: process.env.MLABUSER,
//   password: process.env.MLABPWORD,
// } : require('../../../config');

mongoose.connect('mongodb://europa:europa@ds133321.mlab.com:33321/question-queue');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;
