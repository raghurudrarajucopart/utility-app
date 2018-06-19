import axios from 'axios';
import { history } from '../helpers';

export const loginActions = {
    login,
    users
};

function login(username, password) {
  return dispatch => {
    const requestOptions = {
        headers: { 'Content-Type': 'application/json' },
        body: {"username": username, "password": password}
    };

    axios.post('https://g-ops-qa4.copart.com/login', requestOptions.body)
    .then(res => {
      const userDetails = res.data;
      dispatch(success(userDetails));
      history.push('/dashboard');
    })
    .catch(function (error) {
      console.log(error);
      dispatch(failure(error));
    });
  }

  function success(userDetails) { return { type: "Dashboard_Page", userDetails } }
  function failure(error) { return { type: "Login_Failure", error } }
}

function users() {
  return dispatch => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const persons = res.data;
      dispatch(success(persons));
    })
    .catch(function (error) {
      console.log(error);
      dispatch(failure(error));
    });
  }

  function success(persons) { return { type: "Get_Details_Success", persons } }
  function failure(error) { return { type: "Get_Details_Failure", error } }

}
