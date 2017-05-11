import React from 'react';

function QuestionAdminComponent({question, user, handlers}) {

  //var userHasVoted = question.usersVoted.includes(user.username);
  var isAdmin = user.role === 'admin';
  var isAdminKeep = question.keep; // should populate from database
  var keepColor = isAdminKeep ? '#2b9fda' : 'white';
  var keepColor2 = isAdminKeep ? 'white' : 'black';
  var keepHandler = isAdminKeep ? handlers.unkeep : handlers.keep; // should get handler from question component

  if(isAdmin) {
    return (
      <div className="question-admin-header">
        <span className="question-admin-title"> Townhall #{question.townHall} </span>
        <button style={{backgroundColor: keepColor, color: keepColor2}} className="question-admin-button" onClick={() =>keepHandler(question)}> Keep </button>
      </div>
    )
  } else {
    return (<span />);
  }
}

export default QuestionAdminComponent;
