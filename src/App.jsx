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

import RMMECHome from './components/RMMEC/Home'
import RMMECAnnouncements from './components/RMMEC/Announcements'
import RMMECProjects from './components/RMMEC/Projects'
import RMMECAbout from './components/RMMEC/About'
import RMMECRegister from './components/RMMEC/Register'

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

          <Route path='/rmmec' element={<Protected component = {RMMECHome}/>}></Route>
          <Route path='/rmmec/announcements' element={<RMMECAnnouncements />}></Route>
          <Route path='/rmmec/projects' element={<RMMECProjects />}></Route>
          <Route path='/rmmec/about' element={<RMMECAbout />}></Route>
          <Route path='/rmmec/register' element={<RMMECRegister />}></Route>

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
          <Route path='/admin/users-club' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/admin-club' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-home' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-announcements' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-projects' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-about' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-officers' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-applications-tab' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-users-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-announcements-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-projects-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-officers-archives' element={<Protected component = {Admin}/>}></Route>
          <Route path='/admin/club-applications-archives' element={<Protected component = {Admin}/>}></Route>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
