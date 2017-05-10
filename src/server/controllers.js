const Question = require('./db/db-schema');
const User = require('./db/user');

// USERS
exports.getUsers = (req, res) => {
  console.log(req.headers);
  User.find({}, (err, users) => {
    if (err) res.status(404).send(err);
    else {
      res.status(200).send(users);
    }
  });
};

// ACCEPTS ARRAY EVEN WITH JUST ONE USER, send obj with users property of array of users
exports.postUsers = (req, res) => {
  console.log(req.body);
  req.body.users.forEach(user => { 
    User.find({username:user.username}, (err, foundUser) => {
      let newUser = new User(user)
      newUser.save((err, user) => {
        if (err) {
          res.status(500);
          console.log(err);
        } else {
          console.log('user created', user)
        }
      })
    })
  })
}

// QUESTIONS
exports.getQuestions = (req, res) => {
  Question.find({}, (err, questions) => {
    if (err) res.status(404).send(err);
    else {
      res.status(200).send(questions);
    }
  });
};

exports.postQuestion = (req, res) => {
  console.log(req.body);
  const newQuestion = new Question({
    questionText: req.body.text,
    codeSnippet: req.body.code,
    votes: 0,
    answered: false,
    tags: req.body.tags,
    username: req.body.username,
  });
  newQuestion.markModified('tags');
  newQuestion.save((err, question) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(question);
  });
};

exports.updateQuestion = (req, res) => {
  const id = req.body._id;
  Question.findByIdAndUpdate(id, req.body, { new: true }, (err, data) => {
    if (err) res.status(500).send(err);
    res.send(data);
  });
};

exports.deleteQuestion = (req, res) => {
  Question.findByIdAndRemove(req.body)
  .then(() => res.status(202).send());
};
