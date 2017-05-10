import React from 'react';
import EditQuestionButton from './EditQuestionButton.jsx';
import CodeToggle from './CodeToggle.jsx';

function QuestionMenuComponent({question, user, handlers}) {

  var isAdmin = user.role === 'admin';
  var isAuthor = user.username === question.username;

  var answerButton = isAdmin ? <button className="question-flex-1 question-button" onClick={() => handlers.answer(question)}>Answer</button> : null;
  var deleteButton = isAdmin ? <button className="question-flex-1 question-button" onClick={() => handlers.delete(question)}>Delete</button> : null;
  var editButton = isAdmin || isAuthor ? <EditQuestionButton question={question} handlers={handlers}/> : null;
  var codeEditorButton = <CodeToggle question={question} readOnly="nocursor"/>;

  return (
    <div className="question-buttons">
      {[codeEditorButton, answerButton, editButton, deleteButton]}
    </div>
  )
}

//<CodeToggle question={question} readOnly="nocursor"/>

export default QuestionMenuComponent;
