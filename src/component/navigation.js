import React from "react";
import { Router, Link } from "react-router-dom";
import { history } from '../helpers'
import locale from '../utils/locale';

const NavigationLinks = () => (
  <Router history = {history}>
    <div className="navigation-links-container">
      <ul>
        <li style={style}>
          <Link to="/">{locale("home")}</Link>
        </li>
        <li>
          <Link to="/dashboard">{locale("dashboard")}</Link>
        </li>
        <li>
          <Link to="/UIElements">{locale("ui-elements")}</Link>
        </li>
        <li>
          <Link to="/contact">{locale("contact")}</Link>
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
