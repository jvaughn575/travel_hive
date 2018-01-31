const api = "http://localhost:3001/api"

const baseOptions = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json" 
  },
  mode: 'cors',
  credentials: 'include',
}

export function addUser (username, email, password){
  return fetch(`${api}/join`, {
    ...baseOptions,
    method: 'POST',    
    body: JSON.stringify({username, email, password})
  })
  .then(response => {
    if (response.ok){
      return response.json();
    } 
  })
  .then(data => data ? data.user : null)
  .catch(error => {
    console.log(error);    
  }); 
}

export function loginUser (email, password) {
  return fetch(`${api}/login`, {
    ...baseOptions,
    method: 'POST',    
    body: JSON.stringify({email, password})
  })
  .then(response => {        
    if (response.ok){
      return response.json();      
    }    
  })
  .then(data => data ? {user: data.user, profileImage: data.profileImage} : null)
  .catch(error => {
    console.log(error);
  });    
}

export function logoutUser (){
  fetch(`${api}/logout`).then(response => {
    console.log("Logged out response",response);
  })
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();        
    reader.readAsDataURL(file);    
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);  
  });  
}

export async function addProfilePhoto (info){  
  
  const base64Url = await getBase64(info.file);  
  console.log("Add Profile Photo Info",info);
  return fetch(`${api}/profile`, {
    ...baseOptions,
    method: 'POST',   
    body: JSON.stringify({profileImg:base64Url})
  })
  .then(response => {        
    if (response.ok){            
      info.onSuccess(response.json());      
    } else {      
      info.onError("Profile update failed");
    }      
  })  
  .catch(error => {
    console.log(error);
  })   
  
}

export function addBioText(bioText){
  fetch(`${api}/profile`, {
    ...baseOptions,
    method: 'POST',    
    body: JSON.stringify({bioText:bioText})
  })
  .then(response => {
    if (response.ok){
      return response.json();
    }
  })
  .then(data => data ? data.message : null)
  .catch(error => {
    console.log(error);
  })
}