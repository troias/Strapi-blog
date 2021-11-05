import Link from 'next/link'
import classes from './navbar.module.css'
import { useState, useContext } from 'react'
import {AuthContext} from '../../../../context/authContext'

const Navbar = () => {

    const {user} = useContext(AuthContext)

    return (
        <div className={classes.navContainer}>
            <div>
                <Link href='/'> Logo </Link>

            </div>
            <div className={classes.navLinksContainer}>
                <p>
                    <Link href='/'> home </Link>
                </p>
                { user ?
                    <>
                        <p>
                            <Link href='/profile'> profile </Link>
                        </p>
                        <p>
                            <Link href='/logout'> logout </Link>
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
