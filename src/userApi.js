import React, { Component } from 'react';

const api = 'http://localhost:3001/api';

const baseOptions = {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  mode: 'cors',
  credentials: 'include',
};

export function addUser(username, email, password) {
  return fetch(`${api}/join`, {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data ? data.user : null)
    .catch(error => {
      console.log(error);
    });
}

export function loginUser(email, password) {
  return fetch(`${api}/login`, {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data ? { user: data.user, bioText: data.bioText, profileImage: data.profileImage } : null)
    .catch(error => {
      console.log(error);
    });
}

export function logoutUser() {
  fetch(`${api}/logout`).then(response => {
    console.log('Logged out response',response);
  });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export async function addProfilePhoto(info) {
  const base64Url = await getBase64(info.file);

  console.log('Add Profile Photo Info',info);
  return fetch(`${api}/profile`, {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({ profileImg: base64Url })
  })
    .then(response => {
      if (response.ok){
        info.onSuccess(response.json());
      } else {
        info.onError('Profile update failed');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function addBioText(bioText) {
  return fetch(`${api}/profile`, {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({ bioText: bioText }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data ? data.message : null)
    .catch(error => {
      console.log(error);
    });
}

export function getPictures(url){	    
	const proxy = "http://cors-proxy.htmldriven.com/?url="+url;	
  const imagesAttributes = [];

  return fetch(proxy).then(response => response.json()).then(htmlText => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(htmlText.body, "text/html");
    
    var images = [...doc.images].map(image => image.outerHTML);
      
    var notWorking = function(html) {
        var el = document.createElement('div');
        el.innerHTML = html;
        return el.childNodes[0];
      }
      
    images.forEach(image => {
      var image = notWorking(image);
      var imageAttrs = [...image.attributes];     
      
      imageAttrs.forEach(attr => {
        var attrString = attr.value;
        var attrStringLastThree = attrString.substring(attrString.length -3,attrString.length).toLowerCase();   
        if(attrStringLastThree === "png" || attrStringLastThree === "jpg" || attrStringLastThree === "jpeg"){            
            const imageSrc = attrString;
            const imageAlt = image.attributes.hasOwnProperty("alt") ? image.attributes.alt.value : "";            
            images.push({src:imageSrc, alt:imageAlt});
        }
      });
    });
    return images;
  })
  
};

/********* Add inspiration to database functions *************/
export function getBase64ImgFromUrl(url) {
  const proxy = "http://cors-proxy.htmldriven.com/?url=";
  const result =  fetch(url).then(response => response.blob())
    .then(async blob => {
      const base64Url = await getBase64(blob);  
      return base64Url;
  
  })
  return result;
}

export function addInspiration(inspiration) {
  return fetch(`${api}/inspiration`, {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({ image: inspiration.image, description: inspiration.description }),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data ? data.message : null)
    .catch(error => {
      console.log(error);
    });
}
/***************************************************************/

/************* Get Inspirations ********************************/
export function getInspirations(){
  return fetch(`${api}/inspiration`, {
    ...baseOptions,   
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(data => data ? data : null)
    .catch(error => {
      console.log(error);
    });
}
/***************************************************************/