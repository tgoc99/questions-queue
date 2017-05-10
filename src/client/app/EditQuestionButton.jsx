import React from 'react';

// material-ui
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import QuestionFormComponent from './QuestionFormComponent.jsx';

class EditQuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  handleOpen() {
    this.setState({ open: true });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleEdit(question) {
    this.props.handleEdit(question);
    this.handleClose();
  }
  render() {
    const buttons = [
    ];
    return (
      <span className="question-flex-1">
        <button className="question-button" onTouchTap={this.handleOpen}>Edit</button>
        <Dialog
          title="Edit Question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
          <QuestionFormComponent
            question={this.props.question}
            handleEdit={this.handleEdit}/>
        </Dialog>
      </span>
    );
  }
}

export default EditQuestionButton;
