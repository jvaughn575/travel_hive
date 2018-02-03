export default {
    namespace: 'user',
    state: {
        isLoggedIn: false,
        bioText: "Bio Goes here",
        profileImage: "https://robohash.org/User",      
        
    },
    reducers: {
        logInUser (state){                                    
            return { ...state, isLoggedIn:true };
        },
        logOutUser (state){
            return { ...state, isLoggedIn:false};
        },    
        updateProfileImage (state, {payload: base64Image}){            
            return {...state, profileImage:base64Image};
        },
        updateBioText (state, {payload: bioText}){
            return {...state, bioText: bioText}
        },
    }
}    

