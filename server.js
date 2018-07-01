const express = require('express');
const https = require('https');
const fs = require('fs');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express()
const port = 3003;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', (request, response) => {

  var sampleUsers = fs.readFileSync('sampleUsers.txt');

  response.send(JSON.parse(sampleUsers));

});

app.get('/userList', (request, response) => {

  var sampleUsers = fs.readFileSync('sampleUsers.txt', "utf8");

  response.send(JSON.parse(sampleUsers));

})

app.get('/users', (request, response) => {
  var pageNumber = request.query.pageNumber;
  var noOfRecords = request.query.noOfRecords;
  noOfRecords = typeof noOfRecords  !== 'undefined' ? noOfRecords : 2;
  var sampleUsers = fs.readFileSync('sampleUsers.txt', "utf8");

  var usersJSON = JSON.parse(sampleUsers);
  response.send({users: usersJSON.slice(parseInt(pageNumber)*noOfRecords, (parseInt(pageNumber)*noOfRecords) + noOfRecords), length:usersJSON.length});

})

app.get('/usersLength', (request, response) => {

  var sampleUsers = fs.readFileSync('sampleUsers.txt', "utf8");

  var usersJSON = JSON.parse(sampleUsers);

  response.send({users: usersJSON.slice(0,2), length:usersJSON.length});

})

function UserExist(usersJSON, userId) {

  for (var i = 0; i < usersJSON.length; i++) {
    if(usersJSON[i].id === parseInt(userId)){
      return { userExist:true, userId: userId }
    }
    if(i === usersJSON.length-1) {
      return { userExist:false, userId: userId }
    }
  }

}

function UpdateUser(usersJSON, userJSON, userId) {
  for (var i = 0; i < usersJSON.length; i++) {
    if(usersJSON[i].id === parseInt(userId)){
      usersJSON[i].name = userJSON.name;
      usersJSON[i].username = userJSON.username;
      usersJSON[i].email = userJSON.email;
      usersJSON[i].phone = userJSON.phone;
      usersJSON[i].website = userJSON.website;
    }
  }
  return usersJSON;
}

function createUser(usersJSON, userJSON) {
  let newUser = {};
  let i = usersJSON.length;
  //for (var i = 0; i < usersJSON.length; i++) {
    //if(usersJSON[i].id === parseInt(userId)){
  let newObj = {}
      newObj.id = parseInt(usersJSON[i-1].id) + 1;
      newObj.name = userJSON.name;
      newObj.username = userJSON.username;
      newObj.email = userJSON.email;
      newObj.phone = userJSON.phone;
      newObj.website = userJSON.website;
    //}
  //}
  usersJSON.push(newObj);
  return usersJSON;
}

app.post('/updateUser', (request, response) => {
  var userJSON = {}
  var userId = request.query.userId;
  userJSON.id = request.body.id;
  userJSON.name = request.body.name;
  userJSON.username = request.body.username;
  userJSON.email = request.body.email;
  userJSON.phone = request.body.phone;
  userJSON.website = request.body.website;

  const fileName = 'sampleUsers.txt';

  var sampleUsers = fs.readFileSync(fileName);

  let usersJSON = JSON.parse(sampleUsers);

  var checkUser = UserExist(usersJSON, userId);

  if(checkUser.userExist) {
    var newData = UpdateUser(usersJSON, userJSON, userId);
    fs.writeFile(fileName, JSON.stringify(newData), function (err) {
      if (err) return console.log(err);
      console.log('writing to ' + fileName);
    });
    response.send({newData:newData, successMessage: "User Updated successfully.."})

  } else {
    response.send({errorMessage: "User Not found with "+userId});
  }

});

app.post('/createUser', (request, response) => {
  var userJSON = {}
  userJSON.name = request.body.name;
  userJSON.username = request.body.username;
  userJSON.email = request.body.email;
  userJSON.phone = request.body.phone;
  userJSON.website = request.body.website;

  const fileName = 'sampleUsers.txt';

  var oldUsers = fs.readFileSync(fileName);

  let usersJSON = JSON.parse(oldUsers);

  //var checkUser = UserExist(usersJSON, userId);

  // if(checkUser.userExist) {
  //   var newData = UpdateUser(usersJSON, userJSON, userId);
  //   fs.writeFile(fileName, JSON.stringify(newData), function (err) {
  //     if (err) return console.log(err);
  //     console.log('writing to ' + fileName);
  //   });
  //   response.send({newData:newData, successMessage: "User Updated successfully.."})
  //
  // } else {
  //   response.send({errorMessage: "User Not found with "+userId});
  // }

  var newData = createUser(usersJSON, userJSON);

  fs.writeFile(fileName, JSON.stringify(newData), function (err) {
    if (err){
      response.send({errorMessage: "User Creation Failed!.."});
      console.log(err);
    }
    console.log('writing to ' + fileName);
    response.send({newData:newData, successMessage: "User Created successfully.."})
  });

})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
