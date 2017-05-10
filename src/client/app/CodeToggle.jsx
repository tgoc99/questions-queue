import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import CodeZone from './CodeZone.jsx';

class CodeToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showCode: false };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    const showCode = !this.state.showCode;
    this.setState({ showCode });
  }
  render() {
    const label = this.state.showCode ? 'Hide Code' : 'Show Code';
    const codeZone = this.state.showCode
      ? (<CodeZone className="question-code-zone" codeSnippet={this.props.question.codeSnippet} readOnly={this.props.readOnly} />)
      : null;

    return (
      <div>
        <button className="question-button" onClick={() => this.toggle()}>Code Editor</button>
        {codeZone}
      </div>
    )
  }
}

export default CodeToggle;
