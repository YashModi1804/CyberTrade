import React from 'react'
import Nav from './components/Nav'
import Home from './components/Home'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
export default function App(){
  return(
    <div className="container">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/register' element={<h1>hello</h1>}></Route>
      </Routes>
      </BrowserRouter>
      <Home/>
    </div>
  )
}


