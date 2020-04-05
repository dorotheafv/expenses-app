import {firebase, googleAuthProvider } from '../firebase/firebase';

export const login = (uid) => ({
    type: "LOGIN",
    uid
});

export const logout = () => ({
    type: "LOGOUT"

});
export const startLogin = () => {
    return ()=>{
        //user will be prompt to login with google's pop up
        return firebase.auth().signInWithPopup(googleAuthProvider);
    };
};

export const startLogout = () => {
    return ()=>{
        //user will be prompt to logout from google account
        return firebase.auth().signOut();
    };
};