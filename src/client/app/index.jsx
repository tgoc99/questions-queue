import React from 'react';
import { render } from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/AppBar';

import {
  HashRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  IndexRoute
} from 'react-router-dom';

import LoginComponent from './Login.jsx';
import AppComponent from './app.jsx';
import HomeComponent from './home.component.jsx';
import QuestionComponent from './question.component.jsx';
import ProfileComponent from './profile.component.jsx';
import ManageComponent from './manage.component.jsx';
import AnalyticsComponent from './analytics.component.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: document.cookie.includes('loggedIn=1'),
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }
  login(cb) {
    this.setState({
      loggedIn: true,
    });
    cb();
  }
  logout(cb) {
    this.setState({
      loggedIn: false,
    });
    this.getQuestions();
    cb();
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => (
            this.state.loggedIn ? (
              <Redirect to="/home" />
            ) : (
              <Redirect push to="/login" />
            )
          )} />

          <Route path="/questions"
            render={ () => (
              this.state.loggedIn ? (
                <AppComponent logout={this.logout}
                  login={this.login}
                />
              ) : (
                <Redirect to="/" />
              )
          )} />

          <Route path="/home"
            render={ () => (
              this.state.loggedIn ? (
                <HomeComponent />
              ) : (
                <Redirect to="/" />
              )
          )} />

          <Route path="/question"
            render={ () => (
              this.state.loggedIn ? (
                <QuestionComponent />
              ) : (
                <Redirect to="/" />
              )
          )} />

          <Route path="/profile"
            render={ () => (
              this.state.loggedIn ? (
                <ProfileComponent />
              ) : (
                <Redirect to="/" />
              )
          )} />  

          <Route path="/manage"
            render={ () => (
              this.state.loggedIn ? (
                <ManageComponent />
              ) : (
                <Redirect to="/" />
              )
          )} />  

          <Route path="/analytics"
            render={ () => (
              this.state.loggedIn ? (
                <AnalyticsComponent />
              ) : (
                <Redirect to="/" />
              )
          )} />  

          <Route path="/login" render={() => (
            <LoginComponent
              login={this.login}
              loggedIn={this.state.loggedIn} />
          )}/>
          </div>
      </Router>
    );
  }
}

injectTapEventPlugin();
render(<Main />, document.getElementById('app'));
