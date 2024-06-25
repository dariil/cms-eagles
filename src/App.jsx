import { useState } from 'react'
import { Button } from 'react-bootstrap'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'
import Announcements from './components/Announcements'
import Projects from './components/Projects'
import About from './components/About'
import Register from './components/Register'
import Login from './components/Login'
import Admin from './components/Admin'
import Protected from './components/Protected'

function App() {

  return (
    <>
      <div className='main'>
        <BrowserRouter>
          <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/announcements' element={<Announcements />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/admin' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-users' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-admin' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-home' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-announcements' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-projects' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-aboutUs' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-officers' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-applications' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-users-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-announcements-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-projects-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-officers-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-applications-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-users-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/general-announcements-archives' element={<Protected component = {Admin}/>}></Route>
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
