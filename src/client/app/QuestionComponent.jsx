import React from 'react';

// material-ui
import FlatButton from 'material-ui/FlatButton';

import QuestionVoteComponent from './QuestionVoteComponent.jsx';
import QuestionMenuComponent from './QuestionMenuComponent.jsx';

function QuestionComponent({ key, user, question, handlers }) {

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
              <QuestionVoteComponent question={question} user={user} handlers={handlers}/>
            </div>
          </div>
          <p className="question-created">{moment(question.createdAt).fromNow()}</p>
          <div className="question-tags">
            {question.tags.map(function(tag) {
              return <span className="question-badge">{tag}</span>
            })}
          </div>
        </div>
        <QuestionMenuComponent question={question} user={user} handlers={handlers}/>
      </div>
  );
};

export default QuestionComponent;
