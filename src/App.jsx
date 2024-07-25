import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Announcements from './components/Announcements'
import AnnouncementViewer from './components/AnnouncementViewer'
import Projects from './components/Projects'
import ProjectViewer from './components/ProjectViewer'
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
import RMMECMemberRegister from './components/RMMEC/MemberRegister'
import RMMECAnnouncementViewer from './components/RMMEC/AnnouncementViewer'
import RMMECProjectViewer from './components/RMMEC/ProjectViewer'

import GeneralAboutUsMaintenance from './components/GeneralAboutUsMaintenance'
import GeneralAdminMaintenance from './components/GeneralAdminMaintenance'
import GeneralAnnouncementMaintenance from './components/GeneralAnnouncementMaintenance'
import GeneralApplicationsMaintenance from './components/GeneralApplicationsMaintenance'
import GeneralArchivedAnnouncement from './components/GeneralArchivedAnnouncements'
import GeneralArchivedApplication from './components/GeneralArchivedApplication'
import GeneralArchivedMemberApplication from './components/GeneralArchivedMemberApplications'
import GeneralArchivedOfficers from './components/GeneralArchivedOfficers'
import GeneralArchivedProjects from './components/GeneralArchivedProjects'
import GeneralArchivedUsers from './components/GeneralArchivedUsers'
import GeneralDashboard from './components/GeneralDashboard'
import GeneralHomeMaintenance from './components/GeneralHomeMaintenance'
import GeneralMemberApplicationsMaintenance from './components/GeneralMemberApplicationMaintenance'
import GeneralOfficerMaintenance from './components/GeneralOfficerMaintenance'
import GeneralProjectsMaintenance from './components/GeneralProjectsMaintenance'
import GeneralUsersMaintenance from './components/GeneralUsersMaintenance'

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
            <Route path='/announcements/view_announcement/:id' element={<AnnouncementViewer />}></Route>
            <Route path='/projects/view_project/:id' element={<ProjectViewer />}></Route>

            <Route path='/rmmec' element={<RMMECHome />}></Route>
            <Route path='/rmmec/announcements' element={<RMMECAnnouncements />}></Route>
            <Route path='/rmmec/projects' element={<RMMECProjects />}></Route>
            <Route path='/rmmec/about' element={<RMMECAbout />}></Route>
            <Route path='/rmmec/register' element={<RMMECRegister />}></Route>
            <Route path='/rmmec/member_register' element={<RMMECMemberRegister />}></Route>
            <Route path='/rmmec/announcements/view_announcement/:id' element={<RMMECAnnouncementViewer />}></Route>
            <Route path='/rmmec/projects/view_project/:id' element={<RMMECProjectViewer />}></Route>

            <Route path='/admin' element={<Protected component = {Admin}/>}>
              <Route path='/admin/general-users' element={<Protected component = {GeneralUsersMaintenance}/>}></Route>
              <Route path='/admin/general-admin' element={<Protected component = {GeneralAdminMaintenance}/>}></Route>
              <Route path='/admin/general-home' element={<Protected component = {GeneralHomeMaintenance}/>}></Route>
              <Route path='/admin/general-announcements' element={<Protected component = {GeneralAnnouncementMaintenance}/>}></Route>
              <Route path='/admin/general-projects' element={<Protected component = {GeneralProjectsMaintenance}/>}></Route>
              <Route path='/admin/general-aboutUs' element={<Protected component = {GeneralAboutUsMaintenance}/>}></Route>
              <Route path='/admin/general-officers' element={<Protected component = {GeneralOfficerMaintenance}/>}></Route>
              <Route path='/admin/general-applications' element={<Protected component = {GeneralApplicationsMaintenance}/>}></Route>
              <Route path='/admin/general-member-applications' element={<Protected component = {GeneralMemberApplicationsMaintenance}/>}></Route>
              <Route path='/admin/general-users-archives' element={<Protected component = {GeneralArchivedUsers}/>}></Route>
              <Route path='/admin/general-announcements-archives' element={<Protected component = {GeneralArchivedAnnouncement}/>}></Route>
              <Route path='/admin/general-projects-archives' element={<Protected component = {GeneralArchivedProjects}/>}></Route>
              <Route path='/admin/general-officers-archives' element={<Protected component = {GeneralArchivedOfficers}/>}></Route>
              <Route path='/admin/general-applications-archives' element={<Protected component = {GeneralArchivedApplication}/>}></Route>
              <Route path='/admin/general-users-archives' element={<Protected component = {GeneralArchivedUsers}/>}></Route>
              <Route path='/admin/general-announcements-archives' element={<Protected component = {GeneralArchivedAnnouncement}/>}></Route>
              <Route path='/admin/dashboard-general' element={<Protected component = {GeneralDashboard}/>}></Route>
              <Route path='/admin/users-club' element={<Protected component = {GeneralUsersMaintenance}/>}></Route>
              <Route path='/admin/admin-club' element={<Protected component = {GeneralAdminMaintenance}/>}></Route>
              <Route path='/admin/club-home' element={<Protected component = {GeneralHomeMaintenance}/>}></Route>
              <Route path='/admin/club-announcements' element={<Protected component = {GeneralAnnouncementMaintenance}/>}></Route>
              <Route path='/admin/club-projects' element={<Protected component = {GeneralProjectsMaintenance}/>}></Route>
              <Route path='/admin/club-about' element={<Protected component = {GeneralAboutUsMaintenance}/>}></Route>
              <Route path='/admin/club-officers' element={<Protected component = {GeneralOfficerMaintenance}/>}></Route>
              <Route path='/admin/club-applications-tab' element={<Protected component = {GeneralApplicationsMaintenance}/>}></Route>
              <Route path='/admin/club-member-applications' element={<Protected component = {GeneralMemberApplicationsMaintenance}/>}></Route>
              <Route path='/admin/club-users-archives' element={<Protected component = {GeneralArchivedUsers}/>}></Route>
              <Route path='/admin/club-announcements-archives' element={<Protected component = {GeneralArchivedAnnouncement}/>}></Route>
              <Route path='/admin/club-projects-archives' element={<Protected component = {GeneralArchivedProjects}/>}></Route>
              <Route path='/admin/club-officers-archives' element={<Protected component = {GeneralArchivedOfficers}/>}></Route>
              <Route path='/admin/club-applications-archives' element={<Protected component = {GeneralArchivedApplication}/>}></Route>
              <Route path='/admin/club-member-applications-archives' element={<Protected component = {GeneralArchivedMemberApplication}/>}></Route>
              <Route path='/admin/dashboard-club' element={<Protected component = {GeneralDashboard}/>}></Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
