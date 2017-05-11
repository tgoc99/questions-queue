import React from 'react';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardText, CardHeader, CardTitle } from 'material-ui/Card';
import AddUserComponent from './AddUserComponent.jsx';
import DataComponent from './DataComponent.jsx';


class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: this.props.user.role === 'admin',
      users: this.props.users,
      cohortChoice: 'All Cohorts'
    }
  }


  render() {

    return (
      !this.state.isAdmin ? <div></div> :
      <Card className="admin" initiallyExpanded={true}>
        <CardHeader title='Admin Dashboard'
          actAsExpander={true}
          showExpandableButton={true}
          />
        <CardText expandable={true}>
          <AddUserComponent 
            handleUserSubmit={this.props.handleUserSubmit} 
            handleSelectChange={this.props.handleSelectChange}
          />
          <DataComponent
            questions={this.props.questions}
            users={this.props.users}
            cohortChoice={this.props.cohortChoice}
            handleFilterByCohort={this.props.handleFilterByCohort}
            handleUserDelete={this.props.handleUserDelete}
          />
        </CardText>
      </Card>
    );
  }
}

export default AdminComponent;
