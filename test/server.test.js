const expect2 = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../backend/server');
const Credential = require("../backend/models/credentialSchema");
const User = require("../backend/models/UserSchema");
const Paper = require("../backend/models/paperSchema")
const {todos, users} = require('./seed/seed')

var expect = expect2.expect;


// beforeEach(populateUsers);
// beforeEach(populateTodos);

describe('POST /signup', () => {
  it('should create a new todo', (done) => {
    let text = false;

    request(app)
      .post('/signup')
      .send(users[0])
      .expect((res) => {
        expect(res.body.status).toBe(text);
        console.log(res.body);

      })
      .end((err, res) => {
        if(err) return done(err);
        // console.log(res.body);
        console.log("True");
        done();
      });
  });

});

// describe('Get /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2)
//       })
//       .end(done);
//   })
// });

// describe('GET /todos/:id', () => {
//   it('should return todo doc by id', (done) => {
//     request(app)
//       .get(`/todos/${todos[0]._id.toHexString()}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(todos[0].text);
//       })
//       .end(done);
//   });

//   it('Should return 404 if todo is not found', (done) => {
//     var hexID = new ObjectID().toHexString();

//     request(app)
//       .get(`/todos/${hexID}`)
//       .expect(404)
//       .end(done);
//   })

//   it('Should returb 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123abc')
//       .expect(400)
//       .end(done);
//   });
// });

// describe('DELETE /todos/:id', () => {
//   it('Should remove a todo', (done) => {
//     var hexId = todos[1]._id.toHexString();

//     request(app)
//       .delete(`/todos/${hexId}`)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo._id).toBe(hexId);
//       })
//       .end((err, res) => {
//         if(err) return done(err);

//         Todo.findById(hexId).then((todo) => {
//           expect(todo).toBeNull();
//           done();
//         }).catch((err) => {
//           done(err);
//         })
//       })
//   });

//   it('Should return 404 if todo not found', (done) => {
//     var hexID = new ObjectID().toHexString();

//     request(app)
//       .delete(`/todos/${hexID}`)
//       .expect(404)
//       .end(done);
//   });

//   it('Should return 400 if ObjectID is invalid', (done) => {
//     request(app)
//       .delete('/todos/123abc')
//       .expect(400)
//       .end(done);
//   })
// });

// describe('PATCH /todos/:id', () => {
//   it('Should update the todo', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = "This should be the new text";

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: true,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(true);
//         expect(typeof parseInt(res.body.todo.completedAt)).toBe('number');
//       })
//       .end(done);
//   });

//   it('Should clear completedAt when todo is not completed', (done) => {
//     var hexId = todos[0]._id.toHexString();
//     var text = "This should be the new text";

//     request(app)
//       .patch(`/todos/${hexId}`)
//       .send({
//         completed: false,
//         text
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todo.text).toBe(text);
//         expect(res.body.todo.completed).toBe(false);
//         expect(typeof parseInt(res.body.todo.completedAt)).toBe('number');
//       })
//       .end(done);
//   })
// });

// describe('GET /users/me', () => {
//   it('should return user if authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .expect((res) => {
//         expect(res.body._id).toBe(users[0]._id.toHexString());
//         expect(res.body.email).toBe(users[0].email);
//       })
//       .end(done);
//   });

//   it('should return 401 if not authenticated', (done) => {
//     request(app)
//       .get('/users/me')
//       .expect(401)
//       .expect((res) => {
//         expect(res.body).toEqual({});
//       })
//       .end(done);
//   });
// });

// describe('POST /users', () => {
//   it('should create a user', (done) => {
//     var email = "ex@emil.com";
//     var password = "12345678!";

//     request(app)
//       .post('/users')
//       .send({email, password})
//       .expect((res) => {
//         expect(res.headers['x-auth']).not.toBeNull();
//         expect(res.body._id).not.toBeNull();
//         expect(res.body.email).toBe(email);
//       })
//       .end((err) => {
//         if(err) return done(err);

//         User.findOne({email}).then((user) => {
//           expect(user).not.toBeNull();
//           expect(user.password).not.toBe(password);
//           done();
//         });
//       });
//   });

//   it('should return validation errors if request is invaild', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: "asdvsdf",
//         password: "sd3"
//       })
//       .expect(400)
//       .end(done);
//   });

//   it('should not create user if email in use', (done) => {
//     request(app)
//       .post('/users')
//       .send({
//         email: users[0].email,
//         password: "12345670"
//       })
//       .expect(400)
//       .end(done);
//   });
// });


// describe('POST /users/login', () => {
//   it('Should login user and return auth token', (done) => {
//     request(app)
//       .post('/users/login')
//       .send({
//         email: users[1].email,
//         password: users[1].password
//       })
//       .expect(200)
//       .expect((res) => {
//         expect(res.headers['x-auth']).not.toBeNull();
//       })
//       .end((err, res) => {
//         if(err) return done(err);

//         User.findById(users[1]._id).then((user) => {
//           expect(user.tokens[0]).toHaveProperty('access', 'auth');
//           expect(user.tokens[0]).toHaveProperty('token', res.headers['x-auth']);
//           done();
//         }).catch((err) => done(err));
//       })
//   });

//   it('Should reject invalid login', (done) => {
//       request(app)
//         .post('/users/login')
//         .send({
//           email: users[1].email,
//           password: users[1].password +'1'
//         })
//         .expect(400)
//         .expect((res) => {
//           expect(res.headers['x-auth']).toBeUndefined();
//         })
//         .end((err, res) => {
//           if(err) return done(err);

//           User.findById(users[1]._id).then((user) => {
//             expect(user.tokens.length).toBe(0)
//             done();
//           }).catch((err) => done(err));
//         })
//   });
// });

// describe('DELETE /users/me/token', () => {
//   it('Should remove auth token on logout', (done) => {
//     request(app)
//       .delete('/users/me/token')
//       .set('x-auth', users[0].tokens[0].token)
//       .expect(200)
//       .end((err, res) => {
//         if(err) return done(err);

//         User.findById(users[0]._id).then((user) => {
//           expect(user.tokens.length).toBe(0);
//           done()
//         }).catch((err) => done(err));
//       });
//   });
// });