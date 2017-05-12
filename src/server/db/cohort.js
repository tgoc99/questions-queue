const db = require('./db-config.js');
const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
  cohort: {type: String, required: true, unique: true },
  townHall: {
    type:Number,
    default: 1,
    required: true,
  },
  startDate: {
    type: Date,
    default: new Date(),
  }
});

const Cohort = mongoose.model('Cohort', cohortSchema);

exports.Cohort = Cohort;

exports.oneCohort = (cb, cohort) => {
  console.log('cohort before find', cohort)
  Cohort.find({cohort:cohort}, (err, co) => {
    if(err) console.log(err);
    else {
      if (co[0] === undefined) {
        var newCohort = new Cohort({
          cohort,
          townHall: 1,
          startDate: new Date()
        })
        newCohort.save(err => {
          if(err) throw(err);
          console.log('cth set for first time', newCohort)
        })
        cb(null, newCohort);

      } else if (co[1]=== undefined) {
        cb(null, co[0]);
        console.log('cohort already exists', co[0])

      } else {
        console.log('should only be ONE cohort with this name:', co)
        throw('ERROR: more than cohort of same name exists')
      }
    }
  })
}
  
