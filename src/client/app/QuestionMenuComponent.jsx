import React from 'react';
import EditQuestionButton from './EditQuestionButton.jsx';
import CodeZone from './CodeZone.jsx';

class QuestionMenuComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showCode: false
    }

    this.closeCodeEditor = this.closeCodeEditor.bind(this);
  }

  toogleCode() {
    var current = this.state.showCode;
    this.setState({ showCode: !current })
  }

  closeCodeEditor() {
    this.setState({ showCode: false })
  }

  render() {

    var question = this.props.question;
    var user = this.props.user;
    var handlers = this.props.handlers;

    var isAdmin = user.role === 'admin';
    var isAuthor = user.username == question.username;

    var codeEditorButton = <button key={1} disabled={!question.codeSnippet} className="question-button" onClick={() => this.toogleCode()}>{this.state.showCode ? 'Close Code' : 'Open Code'}</button>;
    var answerButton = (<button key={2} disabled={!isAdmin} className="question-button" onClick={() => handlers.answer(question)}>{(question.answered && isAdmin) ? 'Remove Answer' : 'Answer'}</button>);
    var editButton = (<EditQuestionButton openCodeEditor={this.openCodeEditor} closeCodeEditor={this.closeCodeEditor} isAdmin={isAdmin} isAuthor={isAuthor} key={3} question={question} handlers={handlers}/>);
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
