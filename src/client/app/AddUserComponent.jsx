import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader, CardTitle } from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class AddUserComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      givenName: '',
      role: 'admin',
      cohort: 7,
    }
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCohortChange = this.handleCohortChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleCohortChange(event, index, value) {
    this.setState({ cohort:value });
  }

  handleRoleChange(event, index, value) {
    this.setState({ role:value });
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

    return (
      <Card className="add-user" initiallyExpanded={false}>
        <CardHeader title='Add New User'
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <form onSubmit={this.handleUserSubmit} >
            {<div>
              <TextField
                name="username"
                className="user-input-field" 
                value={this.state.username}
                floatingLabelText='Github Handle'
                onChange={this.handleInputChange} />
              <TextField
                name="givenName"
                className="user-input-field" 
                value={this.state.givenName}
                floatingLabelText='Given Name'
                onChange={this.handleInputChange} />
              <br />
              <SelectField
                className="user-input-field" 
                value={this.state.role}
                floatingLabelText='User Role'
                onChange={this.handleRoleChange} 
              >
                <MenuItem value="admin" primaryText="admin" />
                <MenuItem value="student" primaryText="student" />
              </SelectField>
              <SelectField
                className="user-input-field" 
                value={this.state.cohort}
                floatingLabelText='User Cohort'
                onChange={this.handleCohortChange} 
              >
                <MenuItem value={7} primaryText="hrnyc-7" />
                <MenuItem value={8} primaryText="hrnyc-8" />
                <MenuItem value={9} primaryText="hrnyc-9" />
                <MenuItem value={10} primaryText="hrnyc-10" />
                <MenuItem value={11} primaryText="hrnyc-11" />
              </SelectField> 
            </div>}
              <RaisedButton type="submit" className="submit-button" disabled={!this.state.username || !this.state.role || !this.state.givenName} label="Submit" />
          </form>
        </CardText>
      </Card>


    );
  }
}

export default AddUserComponent;
