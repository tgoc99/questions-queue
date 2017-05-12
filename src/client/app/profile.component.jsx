import React from 'react';
import NavBar from './navbar.component.jsx';

class ProfileComponent extends React.Component {
	constructor(props) {
	    super(props);

	    // Parse cookie to set up a user object with user's name and role
	    const user = {};

	    document.cookie.split(';').forEach((str) => {
			const [k, v] = str.split('=').map(s => s.trim());
				if (k === 'username' || k === 'role' || k === 'img') {
				user[k] = v;
			}
	    });

	    this.state = {
			user,
	    };

	    this.state.user.img = unescape(this.state.user.img);

	    console.log(user);
	}
	render() {
		return (<div className="app-body">
			<div className="profileContent">
				<img className="profilePic" src={this.state.user.img} />
				<div className="profileHeading"> Username </div>
				<div className="profileText"> {this.state.user.username} </div>
				<div className="profileHeading"> Role </div>
				<div className="profileText"> {this.state.user.role} </div>
			</div>
		</div>)
	}
}

export default ProfileComponent;
