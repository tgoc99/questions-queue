import React from 'react';
import EditQuestionButton from './EditComponent.jsx';
import CodeToggle from './CodeToggle.jsx';

function QuestionComponent({ key, user, question, handlers }) {
  // helper
  var isAdmin = user.role === 'admin';
  var isAuthor = user.username === question.username;

  // code editor
  var codeEditor = question.codeSnippet ? (<CodeToggle codeSnippet={question.codeSnippet} readOnly='nocursor'/>) : null;

  // buttons
  var answerButton = isAdmin ? <button onClick={() => handlers.answer(question)}/> : null;
  var deleteButton = isAdmin ? <button onClick={() => handlers.delete(question)}/> : null;
  var editButton = isAdmin || isAuthor ? <EditQuestionButton question={question} handlers={handlers}/> : null;

  // votes
  var userHasVoted = question.usersVoted.includes(user.username);
  var votesIcon = currentUserHasVoted ? 'star' : 'star_border';
  var votesColor = currentUserHasVoted ? 'green' : 'black';
  var votesHandler = currentUserHasVoted ? handlers.downvote : handlers.upvote;

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
              <div className="question-upvote">
                <p>{question.votes}</p>
                <i className="material-icons">{icon}</i>
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

        {codeEditor}
        {[answerButton, deleteButton, editButton]}

      </div>
  );
};

export default QuestionComponent;
