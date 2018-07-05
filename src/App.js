import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, Route, Switch } from 'react-router-dom';

import { history } from './helpers'
import { store } from './store.js'
import NavigationLinks from './component/navigation';

import Header from './component/header.js';
import { LoginPage } from './component/login/login.page.js';
import HomePage from './component/home/home.page';
import { DashboardPage } from './component/dashboard/dashboard.page';
import { UIElementsPage } from './component/UIElements/UIElements.page';
import ContactPage from './component/contact/contact.page';

import logo from './logo2.png';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <div className="App-intro">
          <NavigationLinks />
        <div className="content">
          <Provider store={store}>
           <div>
              <Router history = {history} >
              <Switch>
                <Route exact path="/" component={LoginPage} />
                <Route path="/home" component={HomePage} />
                <Route path="/dashboard" component={DashboardPage} />
                <Route path="/UIElements" component={UIElementsPage} />
                <Route path="/contact" component={ContactPage} />
              </Switch>
              </Router>
            </div>
           </Provider>
         </div>
        </div>
      </div>
    );
  }
}

export default App;
