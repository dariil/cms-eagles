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
import GeneralArchivedUsers from './GeneralArchivedUsers';
import GeneralArchivedAnnouncement from './GeneralArchivedAnnouncements';
import GeneralArchivedProjects from './GeneralArchivedProjects';
import GeneralArchivedOfficers from './GeneralArchivedOfficers';
import GeneralArchivedApplication from './GeneralArchivedApplication';


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

  const items = [
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
      key: 'general-applications',
      icon: <ContainerOutlined />,
      label: 'Applications Maintenance',
      children: [
        {
          key: 'general-applications-tab',
          icon: <ProfileOutlined />,
          label: <Link to="/admin/general-applications" className='mt-2 admin-menu-items'>Applications</Link>,
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
        {
          key: 'general-applications-archives',
          icon: <ProfileOutlined />,
          label: <Link to="/admin/general-applications-archives" className='mt-2 admin-menu-items'>Applications</Link>,
        },
      ],
    },
    {
      type: 'divider',
    },
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
          label: 'Users',
        },
        {
          key: 'admin-club',
          icon: <IdcardOutlined />,
          label: 'Admin',
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
          label: 'Home',
        },
        {
          key: 'club-announcements',
          icon: <NotificationOutlined />,
          label: 'Announcements',
        },
        {
          key: 'club-projects',
          icon: <ProjectOutlined />,
          label: 'Projects',
        },
        {
          key: 'club-about',
          icon: <InfoCircleOutlined />,
          label: 'About Us',
        },
        {
          key: 'club-officers',
          icon: <SolutionOutlined />,
          label: 'Officers',
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
          label: <Link to="/admin/general-applications" className='mt-2 admin-menu-items'>Applications</Link>,
        },
      ]
    },
  ];

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
      default:
        return <Dashboard />;
    }
  };


    return(
        <>
          <div className='admin-nav'>
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
              <div className='admin-body'>
                <Menu
                  defaultSelectedKeys={['dashboard']}
                  // defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={collapsed}
                  items={items}
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