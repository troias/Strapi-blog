
import React, {useState, useEffect, useContext} from 'react'
import {AuthContext} from '../context/authContext'


const LikesContext = React.createContext({

});


export const LikesProvider = (props) => {
    const {user} = useContext(AuthContext);

    const [likesGiven, setLikesGiven] = useState([]);
    const [likesReceived, setLikesReceived] = useState([]);

    useEffect(() => {
        if (user) {

            const likesGiven = async () => {
                const req = await fetch(`http://localhost:1337/likes/given?user=${user.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                const res = await req.json();
                setLikesGiven(res);
            }
            likesGiven();

            const likesReceived = async () => {
                const req = await fetch(`http://localhost:1337/likes/received?post.user=${user.user.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                
                const res = await req.json();
                setLikesReceived(res);
            }
            likesReceived();
        }
    }, [user]);


    console.log("likesGiven", likesGiven);
    console.log("likesReceived", likesReceived);

    const likeContextObj = {
        likesGiven,
        likesReceived
    }

    return (
        <LikesContext.Provider value={ likeContextObj }>
            {props.children}
        </LikesContext.Provider>
    )
}

export default LikesContext