import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function Projects(){
    const [latestProject, setLatestProject] = useState([]); /////   IMPORTANT    //////
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        getLatestProject();
    }, []);

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/1`).then(function(response){
            console.log(response.data);
            setData(response.data);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getLatestProject(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentProject/1`).then(function(response){
            console.log(response.data[0]);
            setLatestProject(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }


    return(
        <>
            <Header></Header>
            {/* <img className='projects-img' src="/assets/team1_upscaled_1.jpg"></img> */}
            <div className='hero-main'>
                <div className='hero-project-overlay'></div>
                <div className='hero-vid-container'>
                    <div className='projects-img' style={{ backgroundImage: `url(http://localhost:8000/${latestProject.cover_image})` }}></div>
                </div>
                <div className='hero-project-title'>
                    <h2 className='font-weight-bold font-size-large prjc-tag'>Latest Project</h2>
                    <h1 className='font-spcase-large font-weight-bold'>{latestProject.project_title}</h1>
                    {latestProject && latestProject.created_at && (
                        <>
                        <h2 className=' font-size-larger'>{latestProject.created_at.split('T')[0]}</h2>
                        <p className='project-details-dark'>{latestProject.project_description}</p>
                        </>
                    )}
                </div>
            </div>
            {
                data.map((item, index) => (
                    <div className={index%2==0 ? 'project-main-container-dark' : 'project-main-container-light'} key={index}>
                        <Container className='w-75' fluid>
                            <Col>
                                <div className={index%2==0 ? "project-txt-img-container-reverse" : "project-txt-img-container"}>
                                    <div className="project-image-old" style={{ backgroundImage: `url(http://localhost:8000/${item.cover_image})` }}></div>
                                    <div className="project-text-contents">
                                        <div>
                                            <h1 className={index%2==0 ? 'w-100 project-name-dark font-spcase-large' : 'w-100 project-name-light font-spcase-large'}>{item.project_title}</h1>
                                            <h1 className={index%2==0 ? 'w-100 project-date-dark font-size-larger' : 'w-100 project-date-light font-size-larger'}>{item.created_at.split('T')[0]}</h1>
                                        </div>
                                        <p className={index%2==0 ? 'project-details-dark' : 'project-details-light'}>{item.project_description}</p>
                                        <a className={index%2==0 ? "proj-read-more-dark" : "proj-read-more-light"} href="#">Read More &rarr;</a>
                                    </div>
                                </div>
                            </Col>
                        </Container>
                    </div>
                ))
            }
            {/* 
                data.map((item, index) => (
                    <div className="skewed-card-main">
                        <div className="skewed-project-main">
                            <div className="project-text">
                                <div>
                                <h4 className="project-details-dark">{item.created_at.split('T')[0]}</h4>
                                <h1 className="project-name-dark font-spcase-large">{item.project_title}</h1>
                                </div>
                                <p className="project-details-dark">{item.project_description}</p>
                                <br />
                                <br />
                                <a className="proj-read-more" href="#">Read More &rarr;</a>
                            </div>
                            <div className="project-image" style={{ backgroundImage: `url(http://localhost:8000/${item.cover_image})` }}>
                                <div className="project-image-overlay"></div>
                            </div>
                        </div>
                    </div>
                ))
                
             */}
            <Footer></Footer>
        </>
    )
}

export default Projects