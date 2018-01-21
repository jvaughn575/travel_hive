import { loginUser, addUser } from './userApi';

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

const loginApiUrl = "http://localhost:3001/api/login/";
const joinApiUrl = "http://localhost:3001/api/join";
/*************************************************/


/*************** Api Server endpoint testing *****************/
// Join Endpoint tests
describe('Join endpoint testing', () => {
  it('returns username if newUser is added to the database', async() => {
    const username =  await addUser(newUser.username,newUser.email, newUser.password, joinApiUrl);
    expect(username).toBe(newUser.username);
  });
  it('returns undefined for username, when adding a user with a duplicate email', async() => {
    const username = await addUser(existingUser.username, existingUser.email, existingUser.password, joinApiUrl);
    expect(username).toBe(undefined)
  });
});

// Login Endpoint tests
describe('Login endpoint testing', () => {
  it('returns username after providing correct credentials to login existing user', async() => {
    const username = await loginUser(existingUser.email, existingUser.passwordCorrect, loginApiUrl);
    expect(username).toBe(existingUser.username);
  });

  it('returns undefined for username when provided with incorrect password', async() => {
    const username = await loginUser(existingUser.email, existingUser.passwordIncorrect, loginApiUrl);
    expect(username).toBe(undefined);
  });
});
/****************************************************************/