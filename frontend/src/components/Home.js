import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo2.jpg';
import './css/home.css'
import NiftyChart from './NiftyChart';

export default function Home() {
  return (
    <div className="container-home">
      <div className="nav_container">
        <ul className="nav_list">
          <li><Link to='/'><img src={logo} alt='logo'/></Link></li>
          <li className='buttons'>
            <Link to='/login' id='login'><span>Login</span></Link>
            <Link to='/register' id='register'><span>Register</span></Link>
          </li>
        </ul>
      </div>
      <div className="animated-title">
        <div className="text-top">
          <div>
            <span className='text-top-1'>Investing</span>
            <span>Made Simple.</span>
          </div>
        </div>
        <div className="text-bottom">
          <div>For You!!</div>
        </div>
      </div>
      <div className="container-nifty">
        <NiftyChart />
      </div>
    </div>
  );
}
