const User = require('./user');

const newUsers = [{
  username: 'tgoc99',
  role: 'admin',
  cohort: 'hrnyc-7',
},
{
  username: 'aruvham',
  role: 'admin',
  cohort: 'hrnyc-7',
},
{
  username: 'huawillian',
  role: 'admin',
  cohort: 'hrnyc-7',
}];

const addUsers = () => {
  newUsers.forEach((user) => {
    const newUser = new User(user);
    newUser.save((err, savedUser) => {
      if (err) console.log(err);
      else console.log('user added: ', savedUser);
    });
  });
};

addUsers();
