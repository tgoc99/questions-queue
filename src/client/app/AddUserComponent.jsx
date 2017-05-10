import React from 'react';
import TextField from 'material-ui/TextField';

class AdminComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      givenName: '',
      role: '',
      cohort: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    handleInputChange(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      this.setState({
        [name]: value,
      });
    }

    handleUserSubmit(event) {
      event.preventDefault();
      this.props.handleUserSubmit(this.state.username, this.state.givenName, this.state.role, this.state.cohort);
      this.setState({
        username: '',
        givenName: '',
        role: '',
        cohort: '',
      });
    }