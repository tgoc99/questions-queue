import React from 'react';
import NavBar from './navbar.component.jsx';

class AnalyticsComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	render() {
		return (<div className="app-body">
			<NavBar />
			Analytics
		</div>)
	}
}

export default AnalyticsComponent;
