const api = "http://localhost:3001/api"

export function addUser (username, email, password){
  return fetch(`${api}/join`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json" 
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({username, email, password})
  })
  .then(response => response.json())
  .then(data => data.user)
  .catch(error => console.log(error)); 
}

export function loginUser (email, password) {
  return fetch(`${api}/login`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then(response => {        
    if (response.status !== 200) throw "Username or password is incorrect!";
    return response.json();
  })
  .then(data => data.user)
  .catch(error => {
    console.log(error);
  })    
}

export function logoutUser (){
  fetch(`${api}/logout`).then(response => {
    console.log("Logged out response",response);
  })
}