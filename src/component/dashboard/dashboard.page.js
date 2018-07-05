import React, { Component } from 'react';
import { connect } from 'react-redux';

import locale from '../../utils/locale';

class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {entity_roles: []},
      userInfo: {},
      isLoggedIn: false,
    }

  }

  render() {
    return(
      <div>
        <h2>{locale('dashboard-page')}</h2>
        <h3><u>{locale('user-details')}</u></h3>
        <div><span>{locale('short-id')}</span>: <span>{this.props.userDetails.entity_id}</span></div>
        <div><span>{locale('mail-id')}</span>: <span>{this.props.userDetails.entity_mail}</span></div>
        <div><span>{locale('user-name')}</span>: <span>{this.props.userDetails.entity_name}</span></div>
        <div><span>{locale('assigned-roles')}</span>: <span>{this.props.userDetails.entity_roles && this.props.userDetails.entity_roles.map( role => <li key={role}>{role}</li> ) }</span></div>
      </div>
    )
  }
}

function mapStateToProps(state) {

  const { userDetails, userInfo, isLoggedIn } = state.dashboard;

  return {
    userDetails,
    isLoggedIn,
    userInfo,
  }
}

const connectedDashboardPage = connect(mapStateToProps)(DashboardPage);
export { connectedDashboardPage as DashboardPage };
