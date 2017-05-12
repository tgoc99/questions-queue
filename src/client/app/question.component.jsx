import React from 'react';
import NavBar from './navbar.component.jsx';
import QuestionFormComponent from './QuestionFormComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  IndexRoute
} from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';

class QuestionComponent extends React.Component {
	constructor(props) {
	    super(props);

	   	// Parse cookie to set up a user object with user's name and role
	    const user = {};

	    document.cookie.split(';').forEach((str) => {
			const [k, v] = str.split('=').map(s => s.trim());
				if (k === 'username' || k === 'role' || k === 'img' || k === 'cohort') {
				user[k] = v;
			}
	    });
console.log(user);
	    this.state = {
			user,
			snackMessage: 'Hello World',
		    snackbackgroundColor: '#536DFE',
		    snackbar: false,
		    townHall: 0
	    };

	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.getTownhall = this.getTownhall.bind(this);

	    this.getTownhall();
	}

	// Methods to update questions
	handleSubmit(text, code = null, tags = []) {
		console.log(this.state.townHall, this.state.user.cohort);

		fetch('/api/questions', {
		  credentials: 'include',
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify({
		    text,
		    code,
		    tags,
		    username: this.state.user.username,
		    townHall: this.state.townHall,
		    cohort: this.state.user.cohort,
		    createdAt: Date.now()
		  }),
		})
		.then(res => res.json())
		.then((data) => {
			console.log(data);
		  this.setState({
		      snackMessage: 'Your Question was added to Queue',
		      snackbackgroundColor: '#536DFE',
		      snackbar: true,
		  });
		});
	}

	getTownhall() {
	    const props = this.props;
	    fetch('/api/townhall', { credentials: 'include' })
	      .then((res) => {
	        if (res.status === 200 || res.status === 304) {
	          // props.login(() => {});
	          return res.json();
	        } else if (res.status === 403) {
	          this.props.logout(() => {});
	          return null;
	        }
	      })
	      .then(res => {
	      		console.log(res);
	      		this.setState({townHall: res.townHall})}
	      );
	  }

	render() {
		return (<MuiThemeProvider>
			<div className="app-body">
				<NavBar />
				<QuestionFormComponent
	              handleSubmit={this.handleSubmit}
	              user={this.state.user}
	            />

	            <Link style={{padding: '4%', textAlign: 'center'}} to="/home">
	                <RaisedButton style={{width: '92%'}} label="BACK TO QUESTIONS" />
	            </Link>

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
