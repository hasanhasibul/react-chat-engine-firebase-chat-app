
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { ChatEngine } from 'react-chat-engine';
import { userContextProvider } from '../../App';
import { useHistory } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
const Chats = () => {
    const [user, setUser] = useContext(userContextProvider);
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const getFiles = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' })

    }
    const handleLogOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            history.push('/')
        }).catch((error) => {
            // An error happened.
            console.log(error);
        });
    }
    useEffect(() => {
        if (!user) {
            history.push('/')
            return;
        }
        axios.get('https://api.chatengine.io/users/me/', {
            headers: {
                'Project-ID': '0fd4da5f-1b68-440f-b1fd-5882473f6544',
                'User-Name': user.email,
                'User-Secret': user.uid
            }
        })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {

                const formData = new FormData()
                formData.append('email', user.email);
                formData.append('username', user.email);
                formData.append('secret', user.uid);
                getFiles(user.photoURL)
                    .then((avatar) => {
                        formData.append('avatar', avatar, avatar.name)
                        console.log(formData);
                        axios.post('https://api.chatengine.io/users/',
                            formData,
                            { headers: { "private-key":'cafc1cfa-fd0d-41ee-822b-318b9d6852cb'} }
                        )
                            .then(() => {
                                setLoading(false)
                            })
                            .catch((error) => {
                                console.log(error);
                            })
                    })
            })
    }, [user, history])
    if (!user || loading) return "Loading..."
    return (
        <div  >
            <div style={{ backgroundColor: '#1890FF',height:'66px'}} className="">
                <div className="row">
                    <div className="col-md-2 text-center p-3  text-white">
                        <h3>React Chatting</h3>
                    </div>
                    <div className="col-md-8">

                    </div>
                    <div className="col-md-2 pt-3">
                        <button onClick={handleLogOut} className="btn btn-primary" >Log Out</button>
                    </div>
                </div>
            </div>
            <div>
                <ChatEngine
                     height='calc(100vh - 85px)'
                    projectID="0fd4da5f-1b68-440f-b1fd-5882473f6544"
                    userName={user.email}
                    userSecret={user.uid}
                    
                />
            </div>
        </div>
    );
};

export default Chats;