import { useState } from 'react'
import { Button } from 'react-bootstrap'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Announcements from './components/Announcements'
import Projects from './components/Projects'

function App() {

  return (
    <>
      <div className='main'>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/announcements' element={<Announcements />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
            {/* <Route path="/"></Route>
            <Route path="/login"></Route>
            <Route path='/register'></Route>
            <Route path='/add' ></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
