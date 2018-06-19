import React from "react";
import { Router, Link } from "react-router-dom";
import { history } from '../helpers'

const NavigationLinks = () => (
  <Router history = {history}>
    <div className="navigation-links-container">
      <ul>
        <li style={style}>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  </Router>
)

const style = {
  textDecoration: "none",
  listStyleType: "none"
}

export default NavigationLinks;
