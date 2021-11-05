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
            // setIsLoggedIn(false),
            authObject.setUser(null);

        },
        // register: (user) => {
        //     authObject.isLoggedIn = true;
        //     authObject.user = user;
        // },
        // isLoggedIn: () => {
        //     return authObject.isLoggedIn;
        // },
        getUser: () => {
            return authObject.user;
        },
        // getUserName: () => {
        //     return authObject.user.name;
        // },
        // getUserEmail: () => {
        //     return authObject.user.email;
        // },
        // getUserPassword: () => {
        //     return authObject.user.password;
        // },
        // getUserConfirmPassword: () => {
        //     return authObject.user.confirmPassword;
        // },
        // getUserIsAdmin: () => {
        //     return authObject.user.isAdmin;
        // },  

    }

    return (
        <AuthContext.Provider value={authObject}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthProvider