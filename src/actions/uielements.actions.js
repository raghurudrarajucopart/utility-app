import axios from 'axios';

import { history } from '../helpers';

export const UIElelmentsActions = {
  getUsers,
  getUserName,
}

function getUsers() {
  console.log("testing....");
  return dispatch => {
    console.log("testing2....");
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const persons = res.data;
      dispatch(success(persons));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function success(persons) { return {type: "getUsersSuccess", data: persons} };
  //function failure(error) { return { type: "getUsersFailure", error } };
};

function getUserName(user) {
  return user.name;
};
