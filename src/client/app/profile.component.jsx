import React from 'react';
import NavBar from './navbar.component.jsx';

class ProfileComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	render() {
		return (<div className="app-body">
			<NavBar />
		Profile
		</div>)
	}
}

export default ProfileComponent;
