import React, { useState } from 'react';
import Nav from './components/Nav';
import Home from './components/Home';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() {
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);

  return (
    <div className="container">
      <BrowserRouter>
      {/* {isRegisterClicked ? null : <Nav/>} */}
        <Routes>
          
          <Route path='/' element={<Home />} />
          <Route
            path='/register'
            element={<Register />}
          ></Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}
