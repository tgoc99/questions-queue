import React from 'react';

function QuestionAdminComponent({question, user, handlers}) {

  const isAdmin = user.role === 'admin';
  const isAdminKeep = question.keep;
  const color = isAdminKeep ? 'rgba(3, 102, 214, 0.30)' : 'rgb(250, 251, 252)';
  const message = isAdminKeep ? 'bookmarked' : 'bookmark';
  const keepHandler = isAdminKeep ? handlers.unkeep : handlers.keep;

  const view = isAdmin ? (
    <div className="question-admin-header">
      <span className="question-admin-title"> TownHall #{question.townHall} </span>
      <button className="question-admin-button" style={{backgroundColor: color}} onClick={() =>keepHandler(question)}>{message}</button>
    </div>
  ) : null;

  return view;
}

export default QuestionAdminComponent;
