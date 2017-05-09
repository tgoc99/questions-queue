import React from 'react';

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    return (
      <div class="question-wrapper">
        <p>{this.props.question.questionText}</p>
        <p>{moment(this.props.question.createdAt).fromNow()}</p>
        <p>{this.props.question.answered}</p>
        <p>{this.props.question.votes}</p>
        <p>{this.props.question.codeSnippet}</p>
        <p>{this.props.question.tags}</p>
      </div>

    );
  }
}

export default Question;
