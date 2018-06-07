import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './helpers'
import NavigationLinks from './component/navigation';

import logo from './logo2.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Utility Application</h1>
          <NavigationLinks>
          </NavigationLinks>
        </header>

        <p className="App-intro">
          

        </p>
      </div>
    );
  }
}

export default App;
