import { loginUser, addUser } from './userApi';
import {app,httpServer} from '../server/server';
console.log("Test Server");

/************** Setup for Testing *************/
const existingUser = {
  username: "Jilian Carlile",
  email: "jillian.carlile@fakeEmail.com",
  passwordCorrect: "1234password",
  passwordIncorrect: "incorrectPassword"
}

const newUser = {
  username: "Traveling Jones",
  email: "traveling.jones@gmail.com",
  password: "Ilovetravel"
}

beforeAll(done => {
  app.on('serverStarted', () => {          
    done();
  });
});

afterAll((done) => {  
  httpServer.close(done);
});

/*************************************************/
 
/*************** Api Server endpoint testing *****************/
// Join Endpoint tests
describe('Join endpoint testing', () => {
  it('returns username if newUser is added to the database', async() => {
    let addedUser =  await addUser(newUser.username,newUser.email,newUser.password);
    expect(addedUser).toBe(newUser.username);
  });
  it('returns undefined for username, when adding a user with a duplicate email', async() => {
    let addedUser = await addUser(existingUser.username,existingUser.email,existingUser.passwordCorrect);
    expect(addedUser).toBe(undefined);
  }); 
});

// Login Endpoint tests
 describe('Login endpoint testing', () => {
  it('returns username after providing correct credentials to login existing user', async() => {
    const loggedinUser = await loginUser(existingUser.email, existingUser.passwordCorrect);
    expect(loggedinUser).toBe(existingUser.username);
  });

  it('returns undefined for username when provided with incorrect password', async() => {
    const username = await loginUser(existingUser.email, existingUser.passwordIncorrect);
    expect(username).toBe(undefined);
  });
}); 
/****************************************************************/
