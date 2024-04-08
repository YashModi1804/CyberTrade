import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../images/logo2.jpg'
import './css/nav.css'
export default function Nav(){
    return(
        <div className='nav_container'>
            <ul className='nav_list'>
                <li><Link to='/'><img src={logo} alt='logo'/></Link></li>
                <li className='buttons'>
                   <Link to='/login' id='login'><span >Login</span></Link> 
                   <Link to='/register' id='register'><span >Register</span></Link>
                </li>
            </ul>
        </div>
    )

}
