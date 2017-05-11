const db = require('./db-config.js');
const mongoose = require('mongoose');

const townHallSchema = new mongoose.Schema({
  townHall: {
    type:Number,
    default: 1,
    unique: true,
    required: true,
  },
  startDate: {
    type:Date
  }
});

const TownHall = mongoose.model('TownHall', townHallSchema);

module.exports = (cb) => {
  TownHall.find({}, (err, TH) => {
    if(err) console.log(err);
    else {
      if (TH[0] === undefined) {
        var currentTownHall = new TownHall({
          townHall: 1,
          startDate: new Date()
        })
        currentTownHall.save(err => {
          if(err) throw(err);
          console.log('cth set for first time', currentTownHall)
        })
        cb(null, currentTownHall);

      } else if (TH[1]=== undefined) {
        cb(null, TH[0]);
        console.log('cth already exists', TH[0])

      } else {
        console.log('should only be ONE Town Hall in array:', TH)
        throw('ERROR: more than town hall instance exists')
      }
    }
  })
}
  
