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
      ? (<CodeZone codeSnippet={this.props.codeSnippet} readOnly={this.props.readOnly} />)
      : null;

    return (
      <div>
        <div className="question-badge-container">
          <span className="question-badge" onClick={this.toggle} label={label}>Code</span>
          <span className="question-badge">Answered</span>
        </div>
        {codeZone}
      </div>
    )
  }
}

export default CodeToggle;
