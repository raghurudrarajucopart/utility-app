import React, { Component } from 'react';
import { connect } from 'react-redux';

import { UIElelmentsActions } from '../../actions/uielements.actions';

class UIElementsPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    return(
      <div className="container">
        <div> UIElementsPage </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
    const { userDetails, isLoggedIn } = state.dashboard;
    const { users } = state.uielements;

    console.log("state: ", state);
    return {
        userDetails,
        isLoggedIn,
        users,
    };
}

const mapDispatchToProps = {
  getUsers: UIElelmentsActions.getUsers,
}

const connectedUIElementsPage = connect(mapStateToProps, mapDispatchToProps)(UIElementsPage);
export { connectedUIElementsPage as UIElementsPage };
