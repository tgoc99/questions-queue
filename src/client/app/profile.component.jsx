import React from 'react';
import NavBar from './navbar.component.jsx';

class ProfileComponent extends React.Component {
	constructor(props) {
	    super(props);

			this.state = { user: {} }

			document.cookie.split(';').forEach((str) => {
				const [k, v] = str.split('=').map(s => s.trim());
					if (k === 'username' || k === 'role') {
					this.state.user[k] = v;
				} else if(k === 'img') {
					this.state.user['avatarURL'] = unescape(v);
				}
			});
			this.getCurrentUser();
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
					if(data.avatarURL !== undefined) this.state.user['avatarURL'] = data.avatarURL;
					this.state.user['givenName'] = data.givenName;
					this.state.user['cohort'] = data.cohort;
					console.log('state', this.state)
				}
      );
  }

	// updateCurrentUser() {
	//
	// 	fetch('/api/user/' + this.state.username, {
	//     credentials: 'include',
	//     method: 'PUT',
	//     headers: {
	//       'Content-Type': 'application/json',
	//     },
	//     body: user
	//   })
	// }

	render() {
		return (<div className="app-body">
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

			</div>
		</div>)
	}
}

export default ProfileComponent;
