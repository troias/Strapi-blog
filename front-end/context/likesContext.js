
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/authContext'


export const LikesContext = React.createContext({

});


const LikesProvider = ({ children }) => {
    const { user } = useContext(AuthContext);


    const [likesGiven, setLikesGiven] = useState([]);
    const [likesReceived, setLikesReceived] = useState([]);

    const reloader = () => {
            if (user) {

                const likesGiven = async () => {
                    const req = await fetch(`http://localhost:1337/likes/given?user=${user.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.jwt}`
                        }
                    });

                    const res = await req.json();
                    setLikesGiven(res);
                }
                likesGiven();

                const likesReceived = async () => {
                    const req = await fetch(`http://localhost:1337/likes/received?post.author=${user.user.id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.jwt}`
                        }
                    });

                    const res = await req.json();
                    setLikesReceived(res);
                }
                likesReceived();
            }
        }
    

    useEffect(() => {
         reloader();

    }, [user]);


  

    const likeContextObj = {
        likesGiven, likesReceived, reloader
       
    }

    return (
        <LikesContext.Provider value={likeContextObj}>
            {children}
        </LikesContext.Provider>
    )
}

export default LikesProvider