import React from 'react';
import { Link } from 'react-router-dom'
 const Navbar = (props)=>{
    const path = {home: '/home', cart: '/cart', login: '/'}
    const cartConfig = { 
        pathname: path.cart, 
        username: props.username 
    };
    const homeConfig = { 
        pathname: path.home, 
        username: props.username 
    };
    const loginConfig = { 
        pathname: path.login, 
        credentials: JSON.parse(localStorage.getItem('credentials'))
    };
    return(
            <nav className="nav-wrapper">
                <div className="container">
                    <Link to={homeConfig} className="brand-logo">Welcome {props.username}</Link>
                    <ul className="right">
                        <li><Link to={cartConfig}>My cart</Link></li>
                        <li><Link to={cartConfig}><i className="material-icons">shopping_cart</i></Link></li>
                        <li><Link to={loginConfig}>Logout</Link></li>
                    </ul>
                </div>
            </nav>
   
        
    )
}

export default Navbar;