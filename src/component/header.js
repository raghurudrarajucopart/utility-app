import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';

import { history } from '../helpers';
import locale, { changeLocale } from '../utils/locale';

import logo from '../logo2.png';
import '../App.css';

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Header extends Component{
  constructor(props, context) {
    super(props);
    this.state = {
       open: false,
       anchorEl: null,
       selectedLang: "English",
       selectedLangCode: "EN",
       langObj : {
         "EN": "English",
         "TEL": "తెలుగు",
         "HIN": "हिंदी",
       }
    }
  }

  componentWillMount() {
    const userSelectedLang = localStorage.getItem('userSelectedLang');
    this.setState({ "selectedLang": JSON.parse(userSelectedLang).selectedLang, "selectedLangCode": JSON.parse(userSelectedLang).selectedLangCode });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuChange = (event, value) => {
    localStorage.setItem('userSelectedLang', JSON.stringify({selectedLang: this.state.langObj[value], selectedLangCode: value}));
    window.location.reload();
    history.push('/');
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  
  render() {
    const { anchorEl } = this.state;
    const languageButtonStyle = {
      backgroundColor: "#6EA9B4",
      padding: "3px 6px",
      minHeight: "18px",
      position: "absolute",
      top: "20px",
      right: "20px",
    }
    return(
      <div>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{locale('welcome-to')} {locale('utility')} {locale('application')}</h1>
          <div className="language_popup" >
              <Button style={languageButtonStyle} aria-owns={anchorEl ? 'fade-menu' : null} aria-haspopup="true" onClick={this.handleMenuClick} >
                Language: <label className="tabcolor" style={{ "fontWeight": "normal", "color": "#aacbff !important", "marginBottom": 0}}>{this.state.selectedLang}</label>
              </Button>
          </div>
          <Menu id="fade-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleMenuClose} TransitionComponent={Fade} >
            <MenuItem onClick={(e) => this.handleMenuChange(e, "EN")}>{this.state.langObj["EN"]}</MenuItem>
            <MenuItem onClick={(e) => this.handleMenuChange(e, "TEL")}>{this.state.langObj["TEL"]}</MenuItem>
            <MenuItem onClick={(e) => this.handleMenuChange(e, "HIN")}>{this.state.langObj["HIN"]}</MenuItem>
          </Menu>
        </header>
      </div>
    )
  }
}

export default Header;
