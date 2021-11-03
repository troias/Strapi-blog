import NavBar from './navbar/navbar'

 const Layout = (props) => {
    return (
        <div>
            <NavBar/>
            {props.children}
        </div>
    )
}

export default Layout