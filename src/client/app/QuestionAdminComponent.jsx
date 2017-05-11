import React from 'react';

function QuestionAdminComponent({question, user, handlers}) {

  //var userHasVoted = question.usersVoted.includes(user.username);
  var isAdmin = user.role === 'admin';
  var isAdminKeep = false; // should populate from database
  var keepColor = isAdminKeep ? 'lightgrey' : 'white';
  var keepHandler = isAdminKeep ? handlers.keep : handlers.unkeep; // should get handler from question component

  if(isAdmin) {
    return (
      <div className="question-admin-header">
        <span className="question-admin-title"> Townhall #1 </span>
        <button style={{backgroundColor: keepColor}} className="question-admin-button" onClick={() => keepHandler()}> Keep </button>
      </div>
    )
  } else {
    return (<span />);
  }
}

export default QuestionAdminComponent;
