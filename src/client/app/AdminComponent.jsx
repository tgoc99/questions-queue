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
      users: this.props.users
    }
  }
  componentDidMount() {
    this.props.getUsers().then(users => this.setState({ users }))
  }

  render() {

    return (
      !this.state.isAdmin ? <div></div> :
      <Card className="admin" initiallyExpanded={true}>
        <CardHeader title='Admin Dashboard'
          actAsExpander={false}
          showExpandableButton={false}
          />
        <CardText expandable={true}>
          <AddUserComponent 
            handleUserSubmit={this.props.handleUserSubmit} 
            handleSelectChange={this.props.handleSelectChange}
          />
          <DataComponent 
            users={this.props.users}
          />
        </CardText>
      </Card>
    );
  }
}

export default AdminComponent;
