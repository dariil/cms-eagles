import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function RMMECProjects(){
    const [latestProject, setLatestProject] = useState([]); /////   IMPORTANT    //////
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
        getLatestProject();
    }, []);

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/CLB-000002`).then(function(response){
            console.log(response.data);
            setData(response.data);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getLatestProject(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentProject/CLB-000002`).then(function(response){
            console.log(response.data[0]);
            setLatestProject(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

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
                        <h2 className='font-size-larger'>{formatDate(latestProject.created_at.split('T')[0])}</h2>
                        <p className='project-details-dark'>{latestProject.project_description}</p>
                        <Link to={"view_project/"+latestProject.project_id} className={"proj-read-more-dark"} href="#">Read More &rarr;</Link>
                        </>
                    )}
                </div>
            </div>
            {
                data.map((item, index) => (
                    <div className={index%2==0 ? 'project-main-container-dark' : 'project-main-container-light'} key={index}>
                        <Container className='project-cont-width'>
                            <Col>
                                <div className={index%2==0 ? "project-txt-img-container-reverse" : "project-txt-img-container"}>
                                    <div className="project-image-old" style={{ backgroundImage: `url(http://localhost:8000/${item.cover_image})` }}></div>
                                    <div className="project-text-contents">
                                        <div>
                                            <h1 className={'w-100 project-name-dark font-spcase-large'}>{item.project_title}</h1>
                                            <h1 className={index%2==0 ? 'w-100 project-date-dark font-size-large' : 'w-100 project-date-light font-size-large'}>{formatDate(item.created_at.split('T')[0])}</h1>
                                        </div>
                                        <p className={index%2==0 ? 'project-details-dark' : 'project-details-light'}>{item.project_description}</p>
                                        <Link to={"view_project/"+item.project_id} className={index%2==0 ? "proj-read-more-dark" : "proj-read-more-light"} href="#">Read More &rarr;</Link>
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

export default RMMECProjects