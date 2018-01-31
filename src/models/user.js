export default {
    namespace: 'user',
    state: {
        
        profileImage: "https://robohash.org/User",       
        isLoggedIn: false,
        
    },
    reducers: {
        logInUser (state){            
            console.log("Log in user Action dispatch");             
            return { ...state, isLoggedIn:true };
        },
        logOutUser (state){
            return { ...state, isLoggedIn:false};
        },    
        updateProfileImage (state, {payload: base64Image}){
            console.log("Update Profile Action dispatched",state,base64Image);
            return {...state, profileImage:base64Image};
        },
    }
}    

