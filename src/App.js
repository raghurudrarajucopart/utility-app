import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers'
import NavigationLinks from './component/navigation';
import LoginPage from './component/login/login.page';
import HomePage from './component/home/home.page';
import DashboardPage from './component/dashboard/dashboard.page';
import ContactPage from './component/contact/contact.page';

import logo from './logo2.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Utility Application</h1>
        </header>
        <div className="App-intro">
          <NavigationLinks />
        <Router history = {history} >
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/contact" component={ContactPage} />
        </Switch>
        </Router>

        </div>
      </div>
    );
  }
}

export default App;
