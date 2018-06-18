import axios from 'axios';

import { history } from '../helpers';


export const loginActions = {
    login,
    users
};


function login(username, password) {
  return dispatch => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"username": username, "password": password})
    };

    axios('https://g-ops-qa4.copart.com/login', requestOptions)
    .then(res => {
      const userDetails = res.data;
      //this.setState({ userDetails })
      dispatch(success(userDetails));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(failure(error));
    });
  // }, error => {
  //   console.log("Error: ", error);
//});
  }

  function success(userDetails) { return { type: "Login_Success", userDetails } }
  function failure(error) { return { type: "Login_Failure", error } }
}

function users() {
  return dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const persons = res.data;
      dispatch(success(persons));
      //this.setState({ persons });
    })
    .catch(function (error) {
      console.log(error);
      dispatch(failure(error));
    });
  }
  function success(persons) { return { type: "Get_Details_Success", persons } }
  function failure(error) { return { type: "Get_Details_Failure", error } }

}
