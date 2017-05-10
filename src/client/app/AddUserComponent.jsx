import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      givenName: '',
      role: '',
      cohort: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });
    }

    handleUserSubmit(event) {
      event.preventDefault();
      this.props.handleUserSubmit(this.state.username, this.state.givenName, this.state.role, this.state.cohort);
      this.setState({
        username: '',
        givenName: '',
        role: '',
        cohort: '',
      });
    }

      render() {
        // options for dialog pop-up
        // there may be a better place to put these

        return (
          <Paper className="question-form" >
            <form onSubmit={this.props.handleEdit ? this.handleEdit : this.handleSubmit} >
              <div>
                <TextField
                  name="questionText"
                  className="question-text-form"
                  fullWidth={true}
                  value={this.state.questionText}
                  multiLine={true}
                  floatingLabelText="Ask a question..."
                  onChange={this.handleInputChange} />
                <FlatButton onClick={this.toggleCode}
                  label= {this.state.showCode ? 'Hide Code' : this.state.showButtonText} />
                {this.state.showCode ? codeZone : null}
                <br/>
                <AutoComplete
                  ref="tagBar"
                  floatingLabelText="Add tags..."
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={allTags}
                  onNewRequest={chosenRequest => this.handleTagAdd(chosenRequest)}
                  maxSearchResults={5}/>
                <TagArray
                  tags={this.state.appliedTags}
                  handleTagDelete={this.handleTagDelete} />
                </div>
                <RaisedButton type="submit" className="submit-button" disabled={!this.state.questionText} label="Submit" />
            </form>
            <Dialog
              actions={dialogActions}
              modal={false}
              open={this.state.dialogOpen}
              onRequestClose={this.closeDialog}
              >Are you sure you want to create a new tag?
            </Dialog>
          </Paper>
        );
      }
    }

    export default QuestionFormComponent;
