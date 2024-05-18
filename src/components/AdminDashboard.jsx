import React, { useState } from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  DashboardTwoTone,
  DashboardOutlined,
  UserOutlined,
  HomeOutlined,
  NotificationOutlined,
  ProjectOutlined,
  InfoCircleOutlined,
  SolutionOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';

const items = [
  {
    key: 'grp',
    label: 'Main',
    type: 'group',
  },
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Dashboard',
  },
  {
    type: 'divider',
  },
  {
    key: 'grp',
    label: 'Manage General',
    type: 'group',
  },
  {
    key: 'general-account-sub',
    label: 'Accounts',
    children: [
      {
        key: 'users-general',
        icon: <UserOutlined />,
        label: 'Users',
      },
      {
        key: 'admin-general',
        icon: <IdcardOutlined />,
        label: 'Admin',
      },
    ],
  },
  {
    key: 'general-maintenance',
    label: 'General Maintenance',
    children: [
      {
        key: 'general-home',
        icon: <HomeOutlined />,
        label: 'Home',
      },
      {
        key: 'general-announcements',
        icon: <NotificationOutlined />,
        label: 'Announcements',
      },
      {
        key: 'general-projects',
        icon: <ProjectOutlined />,
        label: 'Projects',
      },
      {
        key: 'general-about',
        icon: <InfoCircleOutlined />,
        label: 'About Us',
      },
      {
        key: 'general-officers',
        icon: <SolutionOutlined />,
        label: 'Officers',
      },
    ]
  },
  {
    type: 'divider',
  },
  {
    key: 'grp',
    label: 'Manage Club',
    type: 'group',
  },
  {
    key: 'club-account-sub',
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
    type: 'divider',
  },
  {
    key: 'grp',
    label: 'Manage Region',
    type: 'group',
  },
  {
    key: 'region-account-sub',
    label: 'Accounts',
    children: [
      {
        key: 'users-region',
        icon: <UserOutlined />,
        label: 'Users',
      },
      {
        key: 'admin-region',
        icon: <IdcardOutlined />,
        label: 'Admin',
      },
    ],
  },
  {
    key: 'region-maintenance',
    label: 'Region Maintenance',
    children: [
      {
        key: 'region-home',
        icon: <HomeOutlined />,
        label: 'Home',
      },
      {
        key: 'region-announcements',
        icon: <NotificationOutlined />,
        label: 'Announcements',
      },
      {
        key: 'region-projects',
        icon: <ProjectOutlined />,
        label: 'Projects',
      },
      {
        key: 'region-about',
        icon: <InfoCircleOutlined />,
        label: 'About Us',
      },
      {
        key: 'region-officers',
        icon: <SolutionOutlined />,
        label: 'Officers',
      },
    ],
  },
];

function AdminDashboard(){

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
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
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="light"
                  inlineCollapsed={collapsed}
                  items={items}
                  style={{
                    width: !collapsed ? 300 : 80
                  }}
                />
                <div className='admin-content-container'>
                  <div className='child-main-test'></div>
                </div>
              </div>
        </>
    )
}

export default AdminDashboard;