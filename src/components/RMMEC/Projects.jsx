import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function RMMECProjects(){
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
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

    return(
        <>
            <Header></Header>
            <img className='projects-img' src="/assets/team1_upscaled_1.jpg"></img>
            {
                data.map((item, index) => (
                    <div className={index%2==0 ? 'project-main-container-dark' : 'project-main-container-light'}>
                        <Container className='w-75' fluid>
                            <Col>
                                <Row className='justify-content-between mb-2'>
                                    <h1 className={index%2==0 ? 'w-50 project-name-dark font-spcase-large' : 'w-50 project-name-light font-spcase-large'}>{item.project_title}</h1>
                                    <h1 className={index%2==0 ? 'w-50 project-date-dark font-size-larger' : 'w-50 project-date-light font-size-larger'}>{item.created_at.split('T')[0]}</h1>
                                </Row>
                                <div className="project-image" style={{ backgroundImage: `url(http://localhost:8000/${item.cover_image})` }}></div>
                                <p className={index%2==0 ? 'project-details-dark' : 'project-details-light'}>{item.project_description}</p>
                            </Col>
                        </Container>
                    </div>
                ))
            }
            <Footer></Footer>
        </>
    )
}

export default RMMECProjects