import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavBar from './navbar.component.jsx';
import Dialog from 'material-ui/Dialog';

class ProfileComponent extends React.Component {
	constructor(props) {
	    super(props);

			this.state = {
					user: {},
					open: false,
				 	updatedUser: {},
					disableButton: true
				}

			document.cookie.split(';').forEach((str) => {
				const [k, v] = str.split('=').map(s => s.trim());
					if (k === 'username' || k === 'role') {
					this.state.user[k] = v;
				} else if(k === 'img') {
					this.state.user['avatarURL'] = unescape(v);
				}
			});
			this.getCurrentUser();

			this.handleOpen = this.handleOpen.bind(this);
			this.handleClose = this.handleClose.bind(this);
			this.updateUserName = this.updateUserName.bind(this);
			this.updateUserPicture = this.updateUserPicture.bind(this);
			this.updateCurrentUser = this.updateCurrentUser.bind(this);
	}

	handleOpen() {
		this.setState({ open: true });
	}

	handleClose() {
		delete this.state.updatedUser.givenName;
		delete this.state.updatedUser.avatarURL;
		this.setState({ open: false });
	}

	getCurrentUser() {

    fetch('/api/user/' + this.state.user.username, { credentials: 'include' })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          return res.json();
        } else if (res.status === 403) {
          return null;
        }
      })
      .then(data => {
					//console.log('data', data)
					if(data.avatarURL !== undefined) this.state.user['avatarURL'] = data.avatarURL;

					this.state.user['_id'] = data._id;
					this.state.updatedUser['_id'] = data._id;
					this.state.user['givenName'] = data.givenName;
					this.state.user['cohort'] = data.cohort;
					//console.log('state', this.state)
					this.forceUpdate();
				}
      );
  }

	checkDisabled() {
		var disabled = true;
		if(this.state.updatedUser.givenName || this.state.updatedUser.avatarURL) disabled = false;
		this.setState({ disableButton: disabled });
	}

	updateUserName(val) {
		this.state.updatedUser['givenName'] = val;
		if(this.state.updatedUser.givenName === '') delete this.state.updatedUser.givenName;
		this.checkDisabled();
		//console.log(this.state.updatedUser);
	}

	updateUserPicture(val) {
		this.state.updatedUser['avatarURL'] = val;
		if(this.state.updatedUser.avatarURL === '') delete this.state.updatedUser.avatarURL;
		this.checkDisabled();
		//console.log(this.state.updatedUser);
	}

	updateCurrentUser(user) {

		fetch('/api/user/' + this.state.username, {
	    credentials: 'include',
	    method: 'PUT',
			headers: {
	      'Content-Type': 'application/json',
	    },
	    body: JSON.stringify(user)
	  }).then(data => {
			//console.log(data)
			this.getCurrentUser();
			alert('User Updated!');
			this.handleClose();
		})
	}

	render() {
		return (
			<MuiThemeProvider>
			<div className="app-body">
			<NavBar />
			<div className="profileContent">
				<img className="profilePic" src={this.state.user.avatarURL}/>

				<div className="profileHeading">Username</div>
				<div className="profileText"> {this.state.user.username} </div>

				<div className="profileHeading">Name</div>
				<div className="profileText"> {this.state.user.givenName} </div>

				<div className="profileHeading">Role</div>
				<div className="profileText"> {this.state.user.role} </div>

				<div className="profileHeading">Cohort</div>
				<div className="profileText"> {this.state.user.cohort} </div>

				<button onClick={this.handleOpen}>EDIT PROFILE</button>

				<Dialog
          title="Edit Question"
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
          >
					<input onChange={(e) => this.updateUserName(e.target.value)} placeholder="Update your Name"></input>
					<br></br>
					<input onChange={(e) => this.updateUserPicture(e.target.value)} placeholder="Update your Profile Picture"></input>
					<br></br>
					<button disabled={this.state.disableButton} onClick={() => this.updateCurrentUser(this.state.updatedUser)}>SAVE</button>
					<button onClick={this.handleClose}>GO BACK</button>
				</Dialog>
			</div>
		</div>
	</MuiThemeProvider>)
	}
}

export default ProfileComponent;
