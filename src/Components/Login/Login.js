import React, { useContext } from 'react';
import './Login.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from '../firebase.confiq';
import { getAuth, signInWithPopup, GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth";
import { userContextProvider } from './../../App';
import { useHistory } from "react-router-dom";

initializeApp(firebaseConfig);

const Login = () => {

    const [user, setUser] = useContext(userContextProvider)
    const provider = new GoogleAuthProvider();
    const history = useHistory();
    const handleGoogleSingIn = () => {

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                // ...
                history.push('/chats')

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    // handleFacebookSingIn 

    const FacebookProvider = new FacebookAuthProvider();

    const handleFacebookSingIn = () => {
        const auth = getAuth();
        signInWithPopup(auth, FacebookProvider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;
                    console.log(user);
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                setUser(user)

                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);
                console.log(errorMessage);

                // ...
            });
    }
    return (
        <div className="login-page" >
            <div className="login-card ">
                <h3 className="title">Welcome To UniChat</h3>
                <button onClick={handleGoogleSingIn} className="login-button google" >Sing In with Google</button>
                <br /><br />
                <button onClick={handleFacebookSingIn} className="login-button facebook" >Sing In with Facebook</button>
            </div>
        </div>
    );
};

export default Login;