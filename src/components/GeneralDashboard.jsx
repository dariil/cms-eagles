import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import {LineElement, CategoryScale, LinearScale, PointElement} from 'chart.js';
import {Line} from 'react-chartjs-2';
import { Button, ConfigProvider, Tooltip } from 'antd';
import {Link, useNavigate} from 'react-router-dom'
import 'chartjs-adapter-date-fns'; // Import the date adapter
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
  QuestionCircleOutlined,
  UserDeleteOutlined,
  VerifiedOutlined,
  LogoutOutlined
} from '@ant-design/icons';

function GeneralDashboard() {

  const [clubId, setClubId] = useState(null); /////   IMPORTANT    //////
  const [aspirantCount, setAspirantCount] = useState(null);
  const [memberCount, setMemberCount] = useState(null);
  const [announcementCount, setAnnouncementCount] = useState(null);
  const [projectCount, setProjectCount] = useState(null);
  const [officerCount, setOfficerCount] = useState(null);

  const [recentAnnouncement, setRecentAnnouncement] = useState([]);
  const [recentProject, setRecentProject] = useState([]);
  const [recentOfficer, setRecentOfficer] = useState([]);



    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Aspirant applications in the past seven (7) days',
                data: [],
                fill: false,
                backgroundColor: 'rgba(200,0,0,1)',
                borderColor: 'rgba(200,0,0,1)',
            },
        ],
    });
  
    const options = {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day',
          },
        },
      },
    };

    useEffect(() => {
      const storedUserInfo = localStorage.getItem('user-info');
      if (storedUserInfo) {
          try {
              const userInfo = JSON.parse(storedUserInfo);
  
              if (userInfo.response && userInfo.response.access_level) {
                setClubId(userInfo.response.club_id);
                console.log(clubId);
              }
          } catch (error) {
              console.error("Failed to parse user info from localStorage:", error);
          }
        }
    }, []);

    useEffect(() => {
      const fetchData = async () => {
          if (clubId) {
              try {
                  const response = await axios.get(`http://127.0.0.1:8000/api/getSevenRecentApplications/${clubId}`);
                  const data = response.data;

                  setChartData({
                      labels: data.labels,
                      datasets: [
                          {
                              label: 'Aspirant applications in the past seven (7) days',
                              data: data.values,
                              fill: false,
                              backgroundColor: 'rgba(200,0,0,1)',
                              borderColor: 'rgba(200,0,0,1)',
                          },
                      ],
                  });
              } catch (error) {
                  console.error('Error fetching data:', error);
              }
          }
      };
      fetchData();
  }, [clubId]);

    useEffect(() => {
      const fetchRowCount = async () => {
        try {
          const aspirantResponse = await axios.get(`http://127.0.0.1:8000/api/countAspirants/${clubId}`);
          const memberResponse = await axios.get(`http://127.0.0.1:8000/api/countMembers/${clubId}`);
          const announcementResponse = await axios.get(`http://127.0.0.1:8000/api/countAnnouncements/${clubId}`);
          const projectResponse = await axios.get(`http://127.0.0.1:8000/api/countProjects/${clubId}`);
          const officerResponse = await axios.get(`http://127.0.0.1:8000/api/countOfficers/${clubId}`);
          setAspirantCount(aspirantResponse.data.count);
          setMemberCount(memberResponse.data.count);
          setAnnouncementCount(announcementResponse.data.count);
          setProjectCount(projectResponse.data.count);
          setOfficerCount(officerResponse.data.count);
        } catch (error) {
          setError('An error occurred while fetching the row count.');
        }
      };
    
      if (clubId) {
        fetchRowCount();
      }
    }, [clubId]);

    async function getRecentAnnouncement(){
      try {
          await axios.get(`http://127.0.0.1:8000/api/getFiveRecentAnnouncement/${clubId}`).then(function(response){
          setRecentAnnouncement(response.data);
          });
      } catch (error) {
          console.error('Error: ', error);
      }
    }

    async function getRecentProject(){
      try {
          await axios.get(`http://127.0.0.1:8000/api/getFiveRecentProjects/${clubId}`).then(function(response){
            setRecentProject(response.data);
          });
      } catch (error) {
          console.error('Error: ', error);
      }
    }

    async function getRecentOfficer(){
      try {
          await axios.get(`http://127.0.0.1:8000/api/getFiveRecentOfficers/${clubId}`).then(function(response){
          setRecentOfficer(response.data);
          });
      } catch (error) {
          console.error('Error: ', error);
      }
    }

    useEffect(() => {
      if(clubId){ 
       getRecentAnnouncement();
       getRecentProject();
       getRecentOfficer();
     }
   }, [clubId]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const options = {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
      };
      const formattedDate = date.toLocaleDateString(undefined, options);

      return formattedDate;
    }
  
    return (
        <>
            <div className="main-dashboard-container">
                <div className="dahsboard-chart-container">
                    <Line data={chartData} options={options} />
                </div>
                <div className="dashboard-number-main-container">
                  <div className="dashboard-number-container">
                    <p>New Aspirant Application(s) Today</p>
                    <div className="dash-number-stats-container">
                      <div className="dash-icon-container">
                        <ProfileOutlined className="dash-icon"/>
                      </div>
                      
                      <p><b>{aspirantCount}</b></p>
                    </div>
                    <div className="dash-tooltip-container">
                      <Link to="/admin/club-applications-tab" className='mt-2 admin-menu-items'>See more </Link>
                      <ConfigProvider>
                        <Tooltip placement="topRight" title={"Shows the number of new aspirant applicants today"}>
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </ConfigProvider>
                    </div>
                  </div>
                  <div className="dashboard-number-container">
                    <p>New Member Application(s) Today</p>
                    <div className="dash-number-stats-container">
                      <div className="dash-icon-container">
                        <VerifiedOutlined className="dash-icon"/>
                      </div>
                      
                      <p><b>{memberCount}</b></p>
                    </div>
                    <div className="dash-tooltip-container">
                      <Link to="/admin/club-member-applications" className='mt-2 admin-menu-items'>See more </Link>
                      <ConfigProvider>
                        <Tooltip placement="topRight" title={"Shows the number of new member applications today"}>
                          <QuestionCircleOutlined />
                        </Tooltip>
                      </ConfigProvider>
                    </div>
                  </div>
                </div>
              <div className="dashboard-more-contents-main-container">
                <div className="dash-list-container">
                  <div className="dash-list-header-container">
                    <div className="dash-list-header-left">
                      <p>Number of Announcements:</p>
                      <div className="dash-list-announcement-stat">
                        <p className="dash-stats"><b>{announcementCount}</b></p>
                        <ConfigProvider>
                          <Tooltip placement="top" title={"Shows the total number of announcements"}>
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </ConfigProvider>
                      </div>
                      <Link to="/admin/club-announcements" className='mt-2 admin-menu-items'>See more </Link>
                    </div>

                    <div className="dash-icon-container">
                      <NotificationOutlined className="dash-icon"/>
                    </div>
                  </div>
                  <hr></hr>
                  <p>Five most recent announcements</p>
                  <div className="dash-list-scroll-container">
                    {
                      recentAnnouncement.map((item, index) =>(
                        <div className="dash-list-container-w-image" key={index}>
                          <img src={`http://localhost:8000/${item.cover_image}`} className="dash-list-img"></img>
                          <div className="dash-list-text">
                            <p className="dash-list-title"><b>{item.title}</b></p>
                            <p className="dash-list-date">Created at: {formatDate(item.created_at.split('T')[0])}</p>
                          </div>
                        </div>
                      ))
                    }
                    
                  </div>
                </div>
                <div className="dash-list-container">
                  <div className="dash-list-header-container">
                    <div className="dash-list-header-left">
                      <p>Number of Projects:</p>
                      <div className="dash-list-announcement-stat">
                        <p className="dash-stats"><b>{projectCount}</b></p>
                        <ConfigProvider>
                          <Tooltip placement="top" title={"Shows the total number of projects"}>
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </ConfigProvider>
                      </div>
                      <Link to="/admin/club-projects" className='mt-2 admin-menu-items'>See more </Link>
                    </div>

                    <div className="dash-icon-container">
                      <ProjectOutlined className="dash-icon"/>
                    </div>
                  </div>
                  <hr></hr>
                  <p>Five most recently added projects</p>
                  <div className="dash-list-scroll-container">

                    {
                      recentProject.map((item, index) => (
                        <div className="dash-list-container-w-image" key={index}>
                          <img src={`http://localhost:8000/${item.cover_image}`} className="dash-list-img"></img>
                          <div className="dash-list-text">
                            <p className="dash-list-title"><b>{item.project_title}</b></p>
                            <p className="dash-list-date">Created at: {formatDate(item.created_at.split('T')[0])}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className="dash-list-container">
                  <div className="dash-list-header-container">
                    <div className="dash-list-header-left">
                      <p>Number of Officers:</p>
                      <div className="dash-list-announcement-stat">
                        <p className="dash-stats"><b>{officerCount}</b></p>
                        <ConfigProvider>
                          <Tooltip placement="top" title={"Shows the total number of officers"}>
                            <QuestionCircleOutlined />
                          </Tooltip>
                        </ConfigProvider>
                      </div>
                      <Link to="/admin/club-officers" className='mt-2 admin-menu-items'>See more </Link>
                    </div>

                    <div className="dash-icon-container">
                      <SolutionOutlined className="dash-icon"/>
                    </div>
                  </div>
                  <hr></hr>
                  <p>Five most recently added officers</p>
                  <div className="dash-list-scroll-container">

                    {
                      recentOfficer.map((item, index) =>(
                        <div className="dash-list-container-w-image" key={index}>
                          <img src={`http://localhost:8000/${item.official_image}`} className="dash-list-img"></img>
                          <div className="dash-list-text">
                            <p className="dash-list-title"><b>{item.official_name}</b></p>
                            <p className="dash-list-date">Created at: {formatDate(item.created_at.split('T')[0])}</p>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
        </>
    );
  }
  

export default GeneralDashboard;