import React, { Component } from 'react';
import { connect } from 'react-redux';

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
        <h2>DashboardPage</h2>
        <h3><u>User Details</u></h3>
        <div><span>Short Id</span>: <span>{this.props.userDetails.entity_id}</span></div>
        <div><span>Mail id</span>: <span>{this.props.userDetails.entity_mail}</span></div>
        <div><span>User Name</span>: <span>{this.props.userDetails.entity_name}</span></div>
        <div><span>Assigned Roles</span>: <span>{this.props.userDetails.entity_roles.map( role => <li key={role}>{role}</li> )}</span></div>
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
