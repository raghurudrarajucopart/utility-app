import axios from 'axios';

import { history } from '../helpers';

export const UIElelmentsActions = {
  getUsers,
  getUserName,
  getUsersPerPage,
  getUsersLength,
  updateUser,
  createUser,
}

function getUsers() {
  console.log("testing....");
  return dispatch => {
    console.log("testing2....");
    //https://jsonplaceholder.typicode.com/users
    axios.get('http://localhost:3003/userList')
    .then(res => {
      const persons = res.data;
      dispatch(success(persons));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function success(persons) { return [{type: "getUsersSuccess", data: persons}] };

  //function success(persons) { return {type: "getUsersSuccess", data: persons} };
  //function failure(error) { return { type: "getUsersFailure", error } };
};

function getUsersPerPage(pageNumber) {
  console.log("testing....");
  return dispatch => {
    console.log("testing2....");
    axios.get('http://localhost:3003/users?pageNumber='+pageNumber)
    .then(res => {
      const usersObj = res.data;
      dispatch(success(usersObj));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function success(usersObj) { return {type: "getSelectedUsersSuccess", selectedUsers: usersObj.users, usersLength: usersObj.length} };
  //function failure(error) { return { type: "getUsersFailure", error } };
}

/*function getUsersLength() {
  return dispatch => {
    axios.get('http://localhost:3003/usersLength')
    .then(res => {
      const Users = res.data;
      dispatch([successUsersLength(Users.users, Users.length));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function successUsersLength(users,usersLength) { return [{type: "getUsersLengthSuccess", length: usersLength}, {type: "getSelectedUsersSuccess", selectedUsers: users}] };
  //function successUsers(users) { return {type: "getSelectedUsersSuccess", selectedUsers: users} };
  //function failure(error) { return { type: "getUsersFailure", error } };
}*/

function getUsersLength() {
  return dispatch => {
    axios.all([
      axios.get('http://localhost:3003/usersLength'),
      axios.get('http://localhost:3003/users?pageNumber=0')
    ])
    .then(axios.spread((response1, response2) => {
      console.log('response1.data: ', response1.data);
      console.log('response2.data: ', response2.data);
      const UsersLen = response1.data;
      const users = response2.data;
      dispatch(successUsersLength(UsersLen.length));
      dispatch(successUsers(users));
    }))
    // axios.get('http://localhost:3003/usersLength')
    // .then(res => {
    //   const Users = res.data;
    //   dispatch([successUsersLength(Users.users, Users.length));
    // })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function successUsersLength(usersLength) { return {type: "getUsersLengthSuccess", length: usersLength} };
  function successUsers(users) { return {type: "getSelectedUsersSuccess", selectedUsers: users} };
  //function failure(error) { return { type: "getUsersFailure", error } };
}

//function updateUser(usersData, userData, selectedUserId) {
function updateUser(userData, selectedUserId) {
  return dispatch => {
    console.log("testing2....");
    //axios.post('http://localhost:3003/updateUser?userId='+selectedUserId, {udata:userData, usdata:usersData})
    axios.post('http://localhost:3003/updateUser?userId='+selectedUserId, userData)
    .then(res => {
      const usersObj = res;
      dispatch(success(usersObj));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function success(usersObj) { return { type: "updateUserSuccess" } };
}

function createUser(userData) {
  return dispatch => {
    console.log("testing2....");
    //axios.post('http://localhost:3003/updateUser?userId='+selectedUserId, {udata:userData, usdata:usersData})
    axios.post('http://localhost:3003/createUser', userData)
    .then(res => {
      const usersObj = res;
      dispatch(success(usersObj));
    })
    .catch(function (error) {
      console.log(error);
      //dispatch(failure(error));
    });
  }

  function success(usersObj) { return { type: "createUserSuccess" } };
}

function getUserName(user) {
  return user.name;
};
