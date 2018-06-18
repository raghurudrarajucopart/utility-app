import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { loginActions } from '../../actions/login.actions';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        submitted: false,
        persons: [],
        userDetails: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserList = this.handleUserList.bind(this);

    // componentDidMount() {
    //
    // }

  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {

      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(loginActions.login(username, password));
      }

  }

  handleUserList(e) {

    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(loginActions.users());

  }

  render() {
    return(
      <div className="login-page-container">
        <h2>LoginPage</h2>
          <div className="login-form-container">
            <form name="loginForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextField required id="username" label="User Name" margin="normal" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <TextField required id="password" label="Password" type="password" margin="normal" onChange={this.handleChange} />
              </div>
              <div className="form-group">
                <Button variant="contained" color="primary"> Submit </Button>
              </div>
            </form>
          </div>
          <input type="Button" value="getUsers" onClick={this.handleUserList} />
          { this.props.persons.map(person => <li key={person.name}>{person.name}</li>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
    const { loggingIn } = true;
    const { persons } = state.login;
    console.log("state: ", state);
    return {
        loggingIn,
        persons,
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
