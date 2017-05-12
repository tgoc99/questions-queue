import React from 'react';
import NavBar from './navbar.component.jsx';

class ProfileComponent extends React.Component {
	constructor(props) {
	    super(props);

			var user = {}
			console.log(document.cookie)
	    document.cookie.split(';').forEach((str) => {
				const [k, v] = str.split('=').map(s => s.trim());
					if (k === 'username' || k === 'img') {
					user[k] = v;
				}
	    });

			this.state = {
				username: user.username,
				avatarURL: user.img
			}

			this.getCurrentUser();
	}

	getCurrentUser() {
    fetch('/api/user/' + this.state.username, { credentials: 'include' })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 404) {
          return null;
        }
      })
      .then(data => {
      		this.setState({
						id: data._id,
						givenName: data.givenName,
					  role: data.role,
					  cohort: data.cohort
					})}
      );
			console.log(this.state)
  }

	render() {
		console.log(this.state);
		return (<div className="app-body">
			<NavBar />
			<div className="profileContent">
				<img className="profilePic" src={this.state.avatarURL}/>

				<div className="profileHeading">Username</div>
				<div className="profileText"> {this.state.username} </div>

				<div className="profileHeading">Name</div>
				<div className="profileText"> {this.state.givenName} </div>

				<div className="profileHeading">Role</div>
				<div className="profileText"> {this.state.role} </div>

				<div className="profileHeading">Cohort</div>
				<div className="profileText"> {this.state.cohort} </div>


			</div>
		</div>)
	}
}

export default ProfileComponent;
