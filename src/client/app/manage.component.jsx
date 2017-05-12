import { remove } from 'lodash';
import React from 'react';
import NavBar from './navbar.component.jsx';
import AdminComponent from './AdminComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';


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
      cohortChoice: 'All Cohorts',
      snackMessage: 'Hello World',
        snackbackgroundColor: '#536DFE',
        snackbar: false,
    };

  	this.getUsers = this.getUsers.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  	this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleUserSubmit = this.handleUserSubmit.bind(this);
		this.handleUserDelete = this.handleUserDelete.bind(this);
	  this.handleFilterByCohort = this.handleFilterByCohort.bind(this);
	}
  componentDidMount() {
    this.getUsers();
		this.interval = setInterval(() => {
 			this.getUsers();
		}, 2000);
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
    .then(users => {
  	    this.setState({ users })
      	return users;
    	})
  }

  // method to update users
  handleUserSubmit(username, givenName, role, cohort) {
    let users = username.map(user => {
	      return {
	          username: user,
	          givenName,
	          role,
	          cohort,
	        }
	    })
    console.log(username.length, 'users')
	
      fetch('/api/users', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          users: users
        }),
      })
      .then((res)=>{
        this.getUsers();
        return res.json();
      })
      .then(data => {
        console.log(data)
        if(data[1]){
          this.setState({
            snackMessage: data[1] + ' User permission(s) rejected!',
            snackbackgroundColor: '#E53935',
            snackbar: true,
          })
        }
      })
  }

  handleSelectChange(event, index, value) {
    this.setState({ value });
  }

  handleUserDelete(user) {
      const _id = user._id;
      fetch('/api/users', {
        credentials: 'include',
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id }),
      })
      .then(() => {
        this.setState((prevState) => {
          const users = prevState.users;
          remove(users, (q) => q._id === _id);
          return {
            users,
            snackMessage: 'User permission was removed',
            snackbackgroundColor: '#E53935',
            snackbar: true,
          };
        });
      });
      this.getUsers();
    }

  handleFilterByCohort(cohortChoice) {
    this.setState({ cohortChoice })
  }
  closeSnackbar() {
    this.setState({
      snackbar: false,
      snackMessage: '',
    });
  }

	render() {
		return (<MuiThemeProvider> 
			<div className="app-body">
  			<AdminComponent
  			  cohortChoice={this.state.cohortChoice}
  			  handleFilterByCohort={this.handleFilterByCohort}
                handleUserSubmit={this.handleUserSubmit}
                handleUserDelete={this.handleUserDelete}
                handleSelectChange={this.handleSelectChange}
                user={this.state.user}
                users={this.state.cohortChoice === 'All Cohorts' ? this.state.users : this.state.users.filter(u => u.cohort === this.state.cohortChoice)}
                getUsers={this.getUsers}
                questions={this.state.questions}
                />
        <Snackbar
              bodyStyle={{ background: this.state.snackbackgroundColor }}
              open={this.state.snackbar}
              message={this.state.snackMessage}
              autoHideDuration={4000}
              onRequestClose={this.closeSnackbar}
          />
		  </div>
		</MuiThemeProvider> )
	}
}

export default ManageComponent;
