import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import {Link} from 'react-router-dom'
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
            await axios.get(`http://127.0.0.1:8000/api/getProjectsInClub/0`).then(function(response){
            console.log(response.data);
            setData(response.data);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getLatestProject(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentProject/0`).then(function(response){
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
                        <h2 className=' font-size-larger'>{formatDate(latestProject.created_at.split('T')[0])}</h2>
                        <p className='project-details-dark'>{latestProject.project_description}</p>
                        <Link to={"view_project/"+latestProject.project_id} className={"proj-read-more-dark"} href="#">Read More &rarr;</Link>
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
                                            <h1 className={'w-100 project-name-dark font-spcase-large'}>{item.project_title}</h1>
                                            <h1 className={index%2==0 ? 'w-100 project-date-dark font-size-larger' : 'w-100 project-date-light font-size-larger'}>{formatDate(item.created_at.split('T')[0])}</h1>
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
            <Footer></Footer>
        </>
    )
}

export default Projects