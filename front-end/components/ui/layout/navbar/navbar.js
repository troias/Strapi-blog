import Link from 'next/link'
import classes from './navbar.module.css'

const Navbar = () => {
    return (
        <div className={classes.navContainer}>
            <div>
                <Link href='/'> Logo </Link>

            </div>
            <div className={classes.navLinksContainer}>
                <p>
                    <Link href='/'> home </Link>
                </p>

                <p>     <Link href='/posts'> posts </Link>    </p>
            </div>
        </div>
    )
}

export default Navbar;
