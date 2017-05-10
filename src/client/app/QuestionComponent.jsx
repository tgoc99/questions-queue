import React from 'react';
import EditQuestionButton from './EditComponent.jsx';
import CodeToggle from './CodeToggle.jsx';

function QuestionComponent({ key, user, question, handlers }) {
  // helper
  var isAdmin = user.role === 'admin';
  var isAuthor = user.username === question.username;

  // buttons
  var answerButton = isAdmin ? <button onClick={() => handlers.answer(question)}>Answer</button> : null;
  var deleteButton = isAdmin ? <button onClick={() => handlers.delete(question)}>Delete</button> : null;
  var editButton = isAdmin || isAuthor ? <EditQuestionButton question={question} handlers={handlers}/> : null;

  // votes
  var userHasVoted = question.usersVoted.includes(user.username);
  var votesIcon = userHasVoted ? 'star' : 'star_border';
  var votesColor = userHasVoted ? 'green' : 'black';
  var votesHandler = userHasVoted ? handlers.downvote : handlers.upvote;

  return (
      <div className="question-wrapper">

        <div className="question-header-container">
          <div className="question-header">
            <div className="question-text">
              {question.questionText.split('\n').map(function(line) {
                return <p>{line}<br/></p>
              })}
            </div>
            <div className="question-info">
              <div
                className="question-upvote"
                onClick={() => votesHandler(question)}
                style={{color: votesColor}}>
                <p>{question.votes}</p>
                <i className="material-icons">{votesIcon}</i>
              </div>
            </div>
          </div>
          <p className="question-created">{moment(question.createdAt).fromNow()}</p>
          <div className="question-tags">
            {question.tags.map(function(tag) {
              return <span className="question-badge">{tag}</span>
            })}
          </div>
        </div>

        <CodeToggle question={question} readOnly="nocursor"/>
        {[answerButton, deleteButton, editButton]}

      </div>
  );
};

export default QuestionComponent;
