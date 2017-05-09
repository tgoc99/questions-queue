import React from 'react';
import NavBar from './navbar.component.jsx';

class QuestionComponent extends React.Component {
	constructor(props) {
	    super(props);
	}
	render() {
		return (<div className="app-body">
			<NavBar />
		Question
		</div>)
	}
}

export default QuestionComponent;
