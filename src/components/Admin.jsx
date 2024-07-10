import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  NotificationOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  IdcardOutlined,
  TeamOutlined,
  SettingOutlined,
  ProfileOutlined,
  WarningOutlined,
  UserDeleteOutlined,
  VerifiedOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import GeneralUsersMaintenance from './GeneralUsersMaintenance';
import GeneralAdminMaintenance from './GeneralAdminMaintenance';
import GeneralHomeMaintenance from './GeneralHomeMaintenance';
import GeneralAnnouncementMaintenance from './GeneralAnnouncementMaintenance';
import GeneralProjectsMaintenance from './GeneralProjectsMaintenance';
import GeneralAboutUsMaintenance from './GeneralAboutUsMaintenance';
import GeneralOfficerMaintenance from './GeneralOfficerMaintenance';
import GeneralApplicationsMaintenance from './GeneralApplicationsMaintenance';
import GeneralMemberApplicationsMaintenance from './GeneralMemberApplicationMaintenance';
import GeneralArchivedUsers from './GeneralArchivedUsers';
import GeneralArchivedAnnouncement from './GeneralArchivedAnnouncements';
import GeneralArchivedProjects from './GeneralArchivedProjects';
import GeneralArchivedOfficers from './GeneralArchivedOfficers';
import GeneralArchivedApplication from './GeneralArchivedApplication';
import ClubUsersMaintenance from './ClubUsersMaintenance';
import ClubAdminMaintenance from './ClubAdminMaintenance';
import GeneralArchivedMemberApplication from './GeneralArchivedMemberApplications';


const Dashboard = () => <div>Dashboard Content</div>;

function Admin(){
  const [clubId, setClubId] = useState(null);

  // const [clubId, setClubId] = useState(null);

  useEffect(() => {
    // Retrieve the data from localStorage
    const storedUserInfo = localStorage.getItem('user-info');

    if (storedUserInfo) {
      try {
        // Parse the JSON string into an object
        const userInfo = JSON.parse(storedUserInfo);

        // Access the club_id property and update the state
        if (userInfo.response && userInfo.response.club_id !== undefined) {
          setClubId(userInfo.response.club_id);
          console.log('Club ID:', userInfo.response.club_id); // Log the retrieved value
        } else {
          console.log('club_id not found in userInfo.response');
        }
      } catch (error) {
        console.error('Failed to parse user info from localStorage:', error);
      }
    } else {
      console.log('No user-info found in localStorage');
    }
  }, []);


  useEffect(() => {
    console.log(clubId);
  })

    const regionalItems = [
      {
        key: 'main-grp',
        label: 'Main',
        type: 'group',
      },
      {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        type: 'divider',
      },
      {
        key: 'region-grp',
        label: 'Manage Region',
        type: 'group',
      },
      {
        key: 'general-account-sub',
        icon: <TeamOutlined />,
        label: 'Accounts',
        children: [
          {
            key: 'general-users',
            icon: <UserOutlined />,
            label: <Link to={"/admin/general-users"} className='mt-2 admin-menu-items'>Users</Link>,
          },
          {
            key: 'general-admin',
            icon: <IdcardOutlined />,
            label: <Link to="/admin/general-admin" className='mt-2 admin-menu-items'>Admin</Link>,
          },
        ],
      },
      {
        key: 'general-maintenance',
        icon: <SettingOutlined />,
        label: 'General Maintenance',
        children: [
          {
            key: 'general-home',
            icon: <HomeOutlined />,
            label: <Link to="/admin/general-home" className='mt-2 admin-menu-items'>Home</Link>,
          },
          {
            key: 'general-announcements',
            icon: <NotificationOutlined />,
            label: <Link to="/admin/general-announcements" className='mt-2 admin-menu-items'>Announcements</Link>,
          },
          {
            key: 'general-projects',
            icon: <ProjectOutlined />,
            label: <Link to="/admin/general-projects" className='mt-2 admin-menu-items'>Projects</Link>,
          },
          {
            key: 'general-about',
            icon: <InfoCircleOutlined />,
            label: <Link to="/admin/general-aboutUs" className='mt-2 admin-menu-items'>About Us</Link>,
          },
          {
            key: 'general-officers',
            icon: <SolutionOutlined />,
            label: <Link to="/admin/general-officers" className='mt-2 admin-menu-items'>Officers</Link>,
          },
        ]
      },
      {
        key: 'general-archives',
        icon: <WarningOutlined />,
        label: 'Archives',
        children: [
          {
            key: 'general-users-archives',
            icon: <UserDeleteOutlined />,
            label: <Link to={"/admin/general-users-archives"} className='mt-2 admin-menu-items'>Accounts</Link>,
          },
          {
            key: 'general-announcements-archives',
            icon: <NotificationOutlined />,
            label: <Link to="/admin/general-announcements-archives" className='mt-2 admin-menu-items'>Announcements</Link>,
          },
          {
            key: 'general-projects-archives',
            icon: <ProjectOutlined />,
            label: <Link to="/admin/general-projects-archives" className='mt-2 admin-menu-items'>Projects</Link>,
          },
          {
            key: 'general-officers-archives',
            icon: <SolutionOutlined />,
            label: <Link to="/admin/general-officers-archives" className='mt-2 admin-menu-items'>Officers</Link>,
          },
        ],
      },
    ]

    const clubItems = [
      {
        key: 'club-grp',
        label: 'Manage Club',
        type: 'group',
      },
      {
        key: 'club-account-sub',
        icon: <TeamOutlined />,
        label: 'Accounts',
        children: [
          {
            key: 'users-club',
            icon: <UserOutlined />,
            label: <Link to={"/admin/users-club"} className='mt-2 admin-menu-items'>Users</Link>,
          },
          {
            key: 'admin-club',
            icon: <IdcardOutlined />,
            label: <Link to={"/admin/admin-club"} className='mt-2 admin-menu-items'>Admin</Link>,
          },
        ],
      },
      {
        key: 'club-maintenance',
        icon: <SettingOutlined />,
        label: 'Club Maintenance',
        children: [
          {
            key: 'club-home',
            icon: <HomeOutlined />,
            label: <Link to={"/admin/club-home"} className='mt-2 admin-menu-items'>Home</Link>,
          },
          {
            key: 'club-announcements',
            icon: <NotificationOutlined />,
            label: <Link to={"/admin/club-announcements"} className='mt-2 admin-menu-items'>Announcements</Link>,
          },
          {
            key: 'club-projects',
            icon: <ProjectOutlined />,
            label: <Link to={"/admin/club-projects"} className='mt-2 admin-menu-items'>Projects</Link>,
          },
          {
            key: 'club-about',
            icon: <InfoCircleOutlined />,
            label: <Link to={"/admin/club-about"} className='mt-2 admin-menu-items'>About Us</Link>,
          },
          {
            key: 'club-officers',
            icon: <SolutionOutlined />,
            label: <Link to={"/admin/club-officers"} className='mt-2 admin-menu-items'>Officers</Link>,
          },
        ],
      },
      {
        key: 'club-applications',
        icon: <ContainerOutlined />,
        label: 'Applications Maintenance',
        children: [
          {
            key: 'club-applications-tab',
            icon: <ProfileOutlined />,
            label: <Link to="/admin/club-applications-tab" className='mt-2 admin-menu-items'>Aspirants</Link>,
          },
          {
            key: 'club-member-applications-tab',
            icon: <VerifiedOutlined />,
            label: <Link to="/admin/club-member-applications" className='mt-2 admin-menu-items'>Members</Link>,
          },
        ]
      },
      {
        key: 'club-archives',
        icon: <WarningOutlined />,
        label: 'Archives',
        children: [
          {
            key: 'club-users-archives',
            icon: <UserDeleteOutlined />,
            label: <Link to={"/admin/club-users-archives"} className='mt-2 admin-menu-items'>Accounts</Link>,
          },
          {
            key: 'club-announcements-archives',
            icon: <NotificationOutlined />,
            label: <Link to="/admin/club-announcements-archives" className='mt-2 admin-menu-items'>Announcements</Link>,
          },
          {
            key: 'club-projects-archives',
            icon: <ProjectOutlined />,
            label: <Link to="/admin/club-projects-archives" className='mt-2 admin-menu-items'>Projects</Link>,
          },
          {
            key: 'club-officers-archives',
            icon: <SolutionOutlined />,
            label: <Link to="/admin/club-officers-archives" className='mt-2 admin-menu-items'>Officers</Link>,
          },
          {
            key: 'club-applications-archives',
            icon: <ProfileOutlined />,
            label: <Link to="/admin/club-applications-archives" className='mt-2 admin-menu-items'>Aspirants</Link>,
          },
          {
            key: 'club-member-applications-archives',
            icon: <ProfileOutlined />,
            label: <Link to="/admin/club-member-applications-archives" className='mt-2 admin-menu-items'>Members</Link>,
          },
        ],
      },
    ]

  const itemsToRender = clubId === 0 ? regionalItems : clubItems;

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('dashboard');

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = e => {
    setSelectedKey(e.key);
  };

  ///////////////////////////////////// RENDER TABLE UI
  const renderContent = () => {
    switch (selectedKey) {
      case 'dashboard':
        return <Dashboard />;
      case 'general-users':
        return <GeneralUsersMaintenance />;
      case 'general-admin':
        return <GeneralAdminMaintenance />;
      case 'general-home':
        return <GeneralHomeMaintenance />;
      case 'general-announcements':
        return <GeneralAnnouncementMaintenance />;
      case 'general-projects':
        return <GeneralProjectsMaintenance />;
      case 'general-about':
        return <GeneralAboutUsMaintenance />;
      case 'general-officers':
        return <GeneralOfficerMaintenance />;
      case 'general-applications-tab':
        return <GeneralApplicationsMaintenance />;
      case 'general-users-archives':
        return <GeneralArchivedUsers />
      case 'general-announcements-archives':
        return <GeneralArchivedAnnouncement />
      case 'general-projects-archives':
        return <GeneralArchivedProjects />
      case 'general-officers-archives':
        return <GeneralArchivedOfficers />
      case 'general-applications-archives':
        return <GeneralArchivedApplication />

      case 'users-club':
        return <ClubUsersMaintenance />;
      case 'admin-club':
        return <ClubAdminMaintenance />;
      case 'club-home':
        return <GeneralHomeMaintenance />;
      case 'club-announcements':
        return <GeneralAnnouncementMaintenance />;
      case 'club-projects':
        return <GeneralProjectsMaintenance />;
      case 'club-about':
        return <GeneralAboutUsMaintenance />;
      case 'club-officers':
        return <GeneralOfficerMaintenance />;
      case 'club-applications-tab':
        return <GeneralApplicationsMaintenance />;
      case 'club-member-applications-tab':
        return <GeneralMemberApplicationsMaintenance />;
      case 'club-users-archives':
        return <GeneralArchivedUsers />
      case 'club-announcements-archives':
        return <GeneralArchivedAnnouncement />
      case 'club-projects-archives':
        return <GeneralArchivedProjects />
      case 'club-officers-archives':
        return <GeneralArchivedOfficers />
      case 'club-applications-archives':
        return <GeneralArchivedApplication />
      case 'club-member-applications-archives':
        return <GeneralArchivedMemberApplication />
      default:
        return <Dashboard />;

    }
  };
  const navigate = useNavigate();
  function logOut(){
    localStorage.clear();
    navigate('/login');
  }
    return(
        <>
          <div className='admin-nav'>
            <div className='admin-cub-cont-1'>
              <Button
                type="primary"
                onClick={toggleCollapsed}
                style={{
                  marginBottom: 10,
                  backgroundColor: "white",
                  color: 'blue',
                  height: 50,
                  width: 50,
                }}
              >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
              <img className="admin-logo" src="/assets/eagles-nobg-logo.png"></img>
              <p>The Fraternal Order of Eagles</p>
            </div>
            <div className="logout-container">
            <Button
                type="primary"
                onClick={logOut}
                style={{
                  // marginBottom: 10,
                  backgroundColor: "white",
                  color: 'red',
                  height: 50,
                  width: 50,
                }}
              >
                <LogoutOutlined />
              </Button>
            </div>
          </div>
              <div className='admin-body'>
                <Menu
                  defaultSelectedKeys={['dashboard']}
                  // defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={collapsed}
                  items={itemsToRender}
                  style={{
                    width: !collapsed ? 300 : 80
                  }}
                  onClick={handleMenuClick}
                />
                <div className='admin-content-container'>
                  <div className='child-main-test'>
                    {/* RENDER COMPONENT HERE */}
                    {renderContent()}
                  </div>
                </div>
              </div>
        </>
    )
}

export default Admin;