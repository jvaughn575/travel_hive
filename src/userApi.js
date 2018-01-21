export function addUser (username, email, password, apiUrl = 'api/join'){
    let body = JSON.stringify({
        username: username,
        email: email,
        password: password
       });
    return fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json" 
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: body
        }).then(response => {          
            return response.json();
        }).then(data => {       
            return data.user;  
        }).catch(error => {
        console.log(error); 
        }); 
}

export function loginUser (email, password, apiUrl = "api/login") {
    let body = JSON.stringify({
        email: email,
        password: password
    });

    return fetch(apiUrl, {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: body
    }).then(response => {        
        if (response.status !== 200) throw "Username or password is incorrect!";
        return response.json();
    }).then(data => { 
        return data.user;
    }).catch((error) => {
        console.log(error);
    })    
}

export function logoutUser (){
    fetch('api/logout').then(response => {
        console.log("Logged out response",response);
    })
}