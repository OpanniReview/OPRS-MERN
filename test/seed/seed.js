const {ObjectID} = require('mongodb');

const Credential = require("../../backend/models/credentialSchema");
const User = require("../../backend/models/UserSchema");
const Paper = require("../../backend/models/paperSchema");

const users = [{
  login_id: "userone@gmail.com",
  password: "useronepassword"
}, {
    login_id: "usertwo@gmail.com",
  password: "usertwopassword"
}]

const todos = [{
  text: "First test todo"
}, {
  text: "Second test todo"
}];

// var populateTodos = (done) => {
//   Todo.remove({}).then(() => {
//     return Todo.insertMany(todos);
//   }).then(() => done());
// };

// var populateUsers = (done) => {
//   User.remove({}).then(() => {
//     var userOne = new User(users[0]).save();
//     var userTwo = new User(users[1]).save();

//     return Promise.all([userOne, userTwo])
//   }).then(() => done());
// };

module.exports = {
  todos,
//   populateTodos,
  users,
//   populateUsers
}