import React from 'react';
import NavBar from './navbar.component.jsx';
import AdminComponent from './AdminComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class ManageComponent extends React.Component {
	constructor(props) {
	    super(props);

	    // Parse cookie to set up a user object with user's name and role
	    const user = {};
	    document.cookie.split(';').forEach((str) => {
	      const [k, v] = str.split('=').map(s => s.trim());
	      if (k === 'username' || k === 'role') {
	        user[k] = v;
	      }
	    });

	    this.state = {
	      questions: [],
	      user,
	      users: [],
	    };

    	this.getUsers = this.getUsers.bind(this);
    	this.handleSelectChange = this.handleSelectChange.bind(this);
	    this.handleUserSubmit = this.handleUserSubmit.bind(this);
	}
	  componentDidMount() {
	    this.getUsers()
	    .then(users => {
	      this.setState({ users })
	      console.log(this.state.users)
	    });
	  }
	  componentWillUnmount() {
	    clearInterval(this.interval);
	  }
	  getUsers() {
	    const props = this.props;
	    return fetch('/api/users', { credentials: 'include' })
	    .then((res) => {
	      if (res.status === 200 || res.status === 304) {
	        return res.json();
	      } else if (res.status === 403) {
	        this.props.logout(() => {});
	        return null;
	      }
	    })
	  }

	  // method to update users
	  handleUserSubmit(username, givenName, role, cohort) {
	    fetch('/api/users', {
	      credentials: 'include',
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify({
	        users: [{
	          username,
	          givenName,
	          role,
	          cohort,
	        }]
	      }),
	    })
	    this.getUsers();
	  }

	  handleSelectChange(event, index, value) {
	    this.setState({ value });
	  }


	render() {
		return (<MuiThemeProvider> 
			<div className="app-body">
			<NavBar />
			<AdminComponent
              handleUserSubmit={this.handleUserSubmit}
              handleSelectChange={this.handleSelectChange}
              user={this.state.user}
              users={this.state.users}
              getUsers={this.getUsers}
              questions={this.state.questions}
              />
		</div>
		</MuiThemeProvider> )
	}
}

export default ManageComponent;
