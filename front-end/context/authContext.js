import React, { useState } from "react";

export const AuthContext = React.createContext({
    user: {
        name: "",
        password: "",
    },
});


const AuthProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();


    const authObject = {
        isLoggedIn,
        user: user,
        setUser,

        logout: () => {
        
            authObject.setUser(null);

        },

        getUser: () => {
            return authObject.user;
        },

    }

    return (
        <AuthContext.Provider value={authObject}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider