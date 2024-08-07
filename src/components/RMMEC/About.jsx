import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function RMMECAbout(){
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getAboutClub/CLB-000002`).then(function(response){
            console.log(response.data);
            setData(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    return(
        <>
        <Header></Header>
        <div>
            <Container className='w-75 home-container'>
                <Row className="align-items-center justify-content-center justify-content-lg-evenly">
                    <Col lg={6} md={12}>
                        <Row className="text-center text-md-start">
                            <Col>
                                <h2 className='font-weight-bold font-spcase-large'>Our Vision</h2>
                                <br />
                                <p>
                                    {data.vision_content}
                                </p>
                                <br />
                            </Col>
                        </Row>
                        <Row className="justify-content-center justify-content-md-start">
                            <Col className="aboutUs-container-testing">
                                <a className="font-size-large font-weight-bold a-btn-style-1" href="#">Join us</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} md={12} className="mb-3 d-flex justify-content-center">
                        <Image src={"http://localhost:8000/" + data.club_logo} fluid className="img-fluid rounded-lg" />
                    </Col>
                </Row>
            </Container>
            <div className='our-mission-main-container'>
                <div className="blog" style={{ backgroundImage: `url(http://localhost:8000/${data.club_post_image})` }}></div>
                <div className='our-mission-text-container'>
                    <h2 className='font-weight-bold font-spcase-large'>Our Mission</h2>
                    <p>
                        {data.mission_content}
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default RMMECAbout;