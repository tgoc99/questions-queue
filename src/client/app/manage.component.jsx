import React from 'react';
import NavBar from './navbar.component.jsx';

class ManageComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	render() {
		return (<div className="app-body">
			<NavBar />
			Manage
		</div>)
	}
}

export default ManageComponent;
