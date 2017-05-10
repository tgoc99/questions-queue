import React from 'react';
import NavBar from './navbar.component.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';

class QuestionComponent extends React.Component {
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
			snackMessage: 'Hello World',
		    snackbackgroundColor: '#536DFE',
		    snackbar: false,
	    };

	    this.handleSubmit = this.handleSubmit.bind(this);
	}

	// Methods to update questions
	handleSubmit(text, code = null, tags = []) {
		fetch('/api/questions', {
		  credentials: 'include',
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({
		    text,
		    code,
		    tags,
		    username: this.state.user.username,
		  }),
		})
		.then(res => res.json())
		.then((data) => {
		  this.setState({
		      snackMessage: 'Your Question was added to Queue',
		      snackbackgroundColor: '#536DFE',
		      snackbar: true,
		  });
		});
	}

	render() {
		return (<MuiThemeProvider>
			<div className="app-body">
				<NavBar />
				<QuestionFormComponent
	              handleSubmit={this.handleSubmit}
	              user={this.state.user}
	            />
	            <Snackbar
			        bodyStyle={{ background: this.state.snackbackgroundColor }}
			        open={this.state.snackbar}
			        message={this.state.snackMessage}
			        autoHideDuration={4000}
			    />
			</div>
		</MuiThemeProvider>)
	}
}

export default QuestionComponent;
