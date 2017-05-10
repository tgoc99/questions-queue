import React from 'react';

function QuestionVoteComponent({question, user, handlers}) {

  var userHasVoted = question.usersVoted.includes(user.username);
  var votesIcon = userHasVoted ? 'star' : 'star_border';
  var votesColor = userHasVoted ? 'green' : 'black';
  var votesHandler = userHasVoted ? handlers.downvote : handlers.upvote;

  return (
    <div
      className="question-upvote"
      onClick={() => votesHandler(question)}
      style={{color: votesColor}}>
      <p>{question.votes}</p>
      <i className="material-icons">{votesIcon}</i>
    </div>
  )
}

export default QuestionVoteComponent;
