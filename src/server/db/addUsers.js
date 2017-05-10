const User = require('./user');

const newUsers = [{
  username: 'tgoc99',
  givenName: 'Thomas OConnor',
  role: 'admin',
  cohort: 7,
},
{
  username: 'aruvham',
  givenName: 'Arturo Ruvalcaba',
  role: 'admin',
  cohort: 7,
},
{
  username: 'huawillian',
  givenName: 'Willian Hua',
  role: 'admin',
  cohort: 7,
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
