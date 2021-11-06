import Link from 'next/link'
import classes from './navbar.module.css'
import { useState, useContext } from 'react'
import { AuthContext } from '../../../../context/authContext'

const Navbar = () => {

    const { user, logout } = useContext(AuthContext)

    const logoutHandler = () => {
        logout()
    }
    return (
        <div className={classes.navContainer}>
            <div>
                <Link href='/'> Logo </Link>

            </div>
            <div className={classes.navLinksContainer}>
                <p>
                    <Link href='/'> home </Link>
                </p>
                {user ?
                    <>
                        <p>
                            <Link href='/profile'> profile </Link>
                        </p>
                        <p>
                            <Link href='/posts'> posts </Link>
                        </p>
                        <p>
                            <li href="" style={{
                                listStyle: 'none', 
                                cursor: 'pointer' 
                            }} onClick={logoutHandler}> logout </li>
                        </p>
                    </>
                    :
                    <>
                        <p>
                            <Link href='/login'> login </Link>
                        </p>
                        <p>
                            <Link href='/signup'> signup </Link>
                        </p>
                    </>
                }

            </div>
        </div>
    )
}

export default Navbar;
