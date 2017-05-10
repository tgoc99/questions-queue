import { remove } from 'lodash';
import React from 'react';
import NavBar from './navbar.component.jsx';
import QueueComponent from './QueueComponent.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';


const putRequest = (question) =>

  fetch('/api/questions', {
    credentials: 'include',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(question),
  });

// Update an array of questions to include a modified question.
// Mutates array. Does not return a value.
const updateQuestions = (questions, newQ) => {
  const idx = questions.findIndex(i => i._id === newQ._id);
  questions[idx] = newQ;
};


class HomeComponent extends React.Component {
	constructor(props) {
	    super(props);

	    // Parse cookie to set up a user object with user's name and role
	    const user = {};
	    document.cookie.split(';').forEach((str) => {
	      const [k, v] = str.split('=').map(s => s.trim());
	      if (k === 'username' || k === 'role') {
	        user[k] = v;
	      }
	    });

	    this.state = {
			questions: [],
			user,
			snackMessage: 'Hello World',
		    snackbackgroundColor: '#536DFE',
		    snackbar: false,
		}

		this.handleVote = this.handleVote.bind(this);
	    this.handleUpvote = this.handleUpvote.bind(this);
	    this.handleDownvote = this.handleDownvote.bind(this);
	    this.handleAnswered = this.handleAnswered.bind(this);
	    this.handleDelete = this.handleDelete.bind(this);
	    this.handleEdit = this.handleEdit.bind(this);
	    this.handleTagDelete = this.handleTagDelete.bind(this);
	    this.closeSnackbar = this.closeSnackbar.bind(this);
	}

  componentDidMount() {
    this.getUsers()
    .then(users => {
      this.setState({ users })
      console.log(this.state.users)
    });
    this.getQuestions();
    this.interval = setInterval(() => {
      this.getQuestions();
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getUsers() {
    const props = this.props;
    return fetch('/api/users', { credentials: 'include' })
    .then((res) => {
      if (res.status === 200 || res.status === 304) {
        return res.json();
      } else if (res.status === 403) {
        this.props.logout(() => {});
        return null;
      }
    })
  }

  getQuestions() {
    const props = this.props;
    fetch('/api/questions', { credentials: 'include' })
      .then((res) => {
        if (res.status === 200 || res.status === 304) {
          // props.login(() => {});
          return res.json();
        } else if (res.status === 403) {
          this.props.logout(() => {});
          return null;
        }
      })
      .then(questions => {
      		this.setState({questions})}
      	);
  }

  handleVote(question, n) {
    const q = question;
    q.votes += n;
    if (n === 1) {
      q.usersVoted.push(this.state.user.username);
    } else {
      remove(q.usersVoted, i => i === this.state.user.username);
    }
    putRequest(q)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          const questions = prevState.questions;
          updateQuestions(questions, data);
          return { questions };
        });
      })
      .catch((err) => {
        q.votes -= n;
      });
    this.getQuestions();
  }

  handleUpvote(question) {
    this.handleVote(question, 1);
    this.setState({
      snackMessage: 'Your Vote Applied !',
      snackbackgroundColor: '#388E3C',
      snackbar: true,
    });
  }

  handleDownvote(question) {
    this.handleVote(question, -1);
    this.setState({
      snackMessage: 'Your Vote Removed !',
      snackbackgroundColor: '#FF7043',
      snackbar: true,
    });
  }

  handleAnswered(question) {
    const q = question;
    const current = question.answered;
    q.answered = !current;
    putRequest(question)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          const questions = prevState.questions;
          updateQuestions(questions, data);
          return { questions,
            snackMessage: 'Question cleared and moved to answered Queue',
            snackbackgroundColor: '#18FFFF',
            snackbar: true,
          }
        });
      })
      .catch((err) => {
        q.answered = current;
      });
  }

  handleDelete(question) {
    const _id = question._id;
    fetch('/api/questions', {
      credentials: 'include',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    })
    .then(() => {
      this.setState((prevState) => {
        const questions = prevState.questions;
        remove(questions, (q) => q._id === _id);
        return {
          questions,
          snackMessage: 'Your Question was deleted from Queue',
          snackbackgroundColor: '#E53935',
          snackbar: true,
        };
      });
    });
    this.getQuestions();
  }

  handleEdit(question) {
    putRequest(question)
      .then(res => res.json())
      .then((data) => {
        this.setState((prevState) => {
          return {
            snackMessage: 'Your Question was edited and applied to Queue',
            snackbackgroundColor: '#FBC02D',
            snackbar: true,
          };
        });
        this.getQuestions()
      })
      .catch((err) => {
      });
  }

  handleTagDelete(tag, question) {
    const q = question;
    remove(q.tags, t => t === tag);
    putRequest(q)
      .then((res) => {
        if (res.status === 200) {
          this.setState((prevState) => {
            const questions = prevState.questions;
            updateQuestions(questions, q);
            return { questions };
          });
        }
      });
  }

  // Utility

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }
  closeSnackbar() {
    this.setState({
      snackbar: false,
      snackMessage: '',
    });
  }

	render() {
		return (<MuiThemeProvider> 
			<div className="app-body">
			<NavBar />
			<div id="home-wrapper">
		        <QueueComponent
			          title="Pending Questions"
			          questions={this.state.questions}
			          handleUpvote={this.handleUpvote}
			          handleDownvote={this.handleDownvote}
			          handleAnswered={this.handleAnswered}
			          handleDelete={this.handleDelete}
			          handleEdit={this.handleEdit}
			          handleTagDelete={this.handleTagDelete}
			          user={this.state.user}
			        />
		    </div>
		    <Snackbar
			        bodyStyle={{ background: this.state.snackbackgroundColor }}
			        open={this.state.snackbar}
			        message={this.state.snackMessage}
			        autoHideDuration={4000}
			        onRequestClose={this.closeSnackbar}
			    />
		</div>
		</MuiThemeProvider>)
	}
}

export default HomeComponent;
