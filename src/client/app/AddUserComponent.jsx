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
      role: 'student',
      cohort: 'HRNYC-7',
      cohortCity: 'HRNYC',
      cohortNumber: 7,
      bulkSubmit: '',
      allCohorts: []
    }
    this.getAllCohorts = this.getAllCohorts.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
    this.handleCohortChange = this.handleCohortChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCohortNumberChange = this.handleCohortNumberChange.bind(this);
    this.handleCohortCityChange = this.handleCohortCityChange.bind(this);
    this.handleNewCohortSubmit = this.handleNewCohortSubmit.bind(this);
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
  
  getAllCohorts() {
    this.props.getAllCohorts();
  }

  handleCohortCityChange(event, index, value) {
    this.setState({ cohortCity:value });
  }

  handleCohortNumberChange(event, index, value) {
    this.setState({ cohortNumber:value });
  }

  handleRoleChange(event, index, value) {
    this.setState({ role:value });
  }

  handleNewCohortSubmit(event) {
    console.log('new cohort:', this.state.cohortCity + this.state.cohortNumber)
    fetch('/api/cohort', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({cohort: this.state.cohortCity + '-' + this.state.cohortNumber}),
    }).then(() => {
      this.getAllCohorts();
    })
  }

  handleUserSubmit(event) {
    event.preventDefault();
    if(this.state.username) {
      this.props.handleUserSubmit([this.state.username], this.state.givenName || null, this.state.role, this.state.cohort)
    } else if (this.state.bulkSubmit) {
      const users = this.state.bulkSubmit.split(' ');
      this.props.handleUserSubmit(users, null, this.state.role, this.state.cohort)
    }
    this.setState({
      username: '',
      givenName: '',
      bulkSubmit: '',
    });
  }

  render() {
    const cohorts = this.props.allCohorts.map(c => {
      return <MenuItem key={c[0]} value={c[1]} primaryText={c[1]} />
    })

    return (
      <Card className="add-user" initiallyExpanded={false}>
        <CardHeader title='Add New Users'
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <form onSubmit={this.handleUserSubmit} >
            {<div>
              Add One New User: <br/>
              <TextField
                name="username"
                className="user-input-field" 
                value={this.state.username}
                errorText={(this.state.username && this.state.bulkSubmit) ? "Enter either one user or a bulk user submission, not both" : ""}
                floatingLabelText='Github Handle'
                onChange={this.handleInputChange} />
              <TextField
                name="givenName"
                className="user-input-field" 
                value={this.state.givenName}
                floatingLabelText='Given Name'
                onChange={this.handleInputChange} />
              <br />
              Bulk User Submission: <br/>
              <TextField
                name='bulkSubmit'
                className="user-input-field"
                value={this.state.bulkSubmit}
                floatingLabelText="Enter GitHub Usernames separated by spaces..."
                errorText={(this.state.username && this.state.bulkSubmit) ? "Enter either one user or a bulk user submission, not both" : ""}
                fullWidth={true}
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
                {cohorts}
              </SelectField> 
            </div>}
              <RaisedButton type="submit" className="submit-button" disabled={!this.state.username && !this.state.bulkSubmit || this.state.username && this.state.bulkSubmit} label="Submit" />
          </form>
          <form onSubmit={this.handleNewCohortSubmit} >
            {<div>
              Create New Cohort: <br/>
              
              <SelectField
                className="user-input-field" 
                value={this.state.cohortCity}
                floatingLabelText='User Cohort City'
                onChange={this.handleCohortCityChange} 
              >
                <MenuItem value={'HRNYC'} primaryText="New York" />
                <MenuItem value={'HRSFO'} primaryText="San Francisco" />
                <MenuItem value={'HRLAX'} primaryText="Los Angeles" />
                <MenuItem value={'HRAUS'} primaryText="Austin" />
                <MenuItem value={'HRREM'} primaryText="Remote" />
              </SelectField> 
              <TextField
                name="cohortNumber"
                errorText={(+this.state.cohortNumber < 0 || +this.state.cohortNumber >400 || isNaN(+this.state.cohortNumber)) ? "Please enter a valid cohort number" : ""}
                className="user-input-field" 
                value={this.state.cohortNumber}
                floatingLabelText='Enter Cohort Number'
                onChange={this.handleInputChange} />
            </div>}
              <RaisedButton type="submit" className="submit-button" disabled={!this.state.cohortCity || !this.state.cohortNumber || typeof +this.state.cohortNumber !== 'number'} label="Submit" />
          </form>
        </CardText>
      </Card>


    );
  }
}

export default AddUserComponent;
