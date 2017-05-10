import React from 'react';
import EditQuestionButton from './EditQuestionButton.jsx';
import CodeZone from './CodeZone.jsx';

class QuestionMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //showCode: !!this.props.question.codeSnippet
      // snippet: this.props.question.codeSnippet
      //answered: this.props.question.answered
      showCode: false
    }
  }

  toogleCode() {
    var current = this.state.showCode;
    this.setState({ showCode: !current })
    //console.log(this.state.showCode);
  }

  render() {

    var question = this.props.question;
    var user = this.props.user;
    var handlers = this.props.handlers;

    var isAdmin = user.role === 'admin';
    var isAuthor = user.username == question.username;

    var codeEditorButton = <button key={1} disabled={!question.codeSnippet} className="question-button" onClick={() => this.toogleCode()}>{this.state.showCode ? 'Close Code' : 'Open Code'}</button>;
    var answerButton = (<button key={2} disabled={!isAdmin} className="question-button" onClick={() => handlers.answer(question)}>{(question.answered && isAdmin) ? 'Unanswer' : 'Answer'}</button>);
    var editButton = (<EditQuestionButton isAdmin={isAdmin} isAuthor={isAuthor} key={3} question={question} handlers={handlers}/>);
    var deleteButton = (<button key={4} disabled={!isAdmin} className="question-button" onClick={() => handlers.delete(question)}>Delete</button>);

    var codeZone = this.state.showCode ? (
      <CodeZone
        codeSnippet={question.codeSnippet}
        readOnly="true"
      />
    ) : null;

    return (
      <div>
        <div className="question-code-container" style={{display: this.state.showCode ? 'block' : 'none'}}>
          {codeZone}
        </div>
        <div className="question-buttons">
          {[codeEditorButton, answerButton, editButton, deleteButton]}
        </div>
      </div>
    )
  }
}

export default QuestionMenuComponent;
