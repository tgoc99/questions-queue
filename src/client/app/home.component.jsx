import React from 'react';
import NavBar from './navbar.component.jsx';

class HomeComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	render() {
		return (<div className="app-body">
			<NavBar />
			Home
		</div>)
	}
}

export default HomeComponent;
