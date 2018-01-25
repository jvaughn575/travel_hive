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

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();    
    reader.readAsBinaryString(file);
    reader.onload = () => resolve(btoa(reader.result));
    reader.onerror = error => reject(error);  
  });  
}

export async function addProfilePhoto (info){  
  
  const base64Url = await getBase64(info.file);  
  console.log("Add Profile Photo Info",info);
  fetch(`${api}/profile`, {
    headers: {      
      "Accept": "application/json",
      "authorization": 'authorization-text',
      "Content-Type": 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    body: JSON.stringify({base64Url})
  })
  .then(response => {        
    if (response.status === 200){      
      info.onSuccess(base64Url,info.file.status = 'done');
      return response.json();
    } else {
      return response.json();
    }
  })  
  .then(data => console.log(data))  
  .catch(error => {
    console.log(error);
  })   
  return true; 
}