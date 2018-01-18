export function addUser (values){
    let body = JSON.stringify({
        username: values.userName,
        email: values.email,
        password: values.password
       });
    return fetch('/api/join', {
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

export function loginUser (values) {
    let body = JSON.stringify({
        email: values.email,
        password: values.password
    });

    return fetch('api/login', {
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