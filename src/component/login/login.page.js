import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class LoginPage extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div className="login-page-container">
        <h2>LoginPage</h2>
          <div className="login-form-container">
            <form name="loginForm" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <TextField required id="username" label="User Name" margin="normal" />
              </div>
              <div className="form-group">
                <TextField required id="password" label="Password" type="password" margin="normal" />
              </div>
              <div className="form-group">
                <Button variant="contained" color="primary" > Submit
                </Button>
              </div>
            </form>
          </div>
      </div>
    )
  }
}

export default LoginPage;
