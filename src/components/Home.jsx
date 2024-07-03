import Header from './Header'
import Footer from './Footer'
import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'; // You can create your custom CSS file for additional styling if needed


function Home(){
    const [data, setData] = useState([]); /////   IMPORTANT    //////

    useEffect(() =>{
        getData();
    }, []);

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getHome/0`).then(function(response){
            console.log(response.data[0]);
            setData(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        console.log(data.home_id);
    }, [data]);

    return (
        <>
            <Header></Header>
            <div className='hero-main'>
                <div className='hero-overlay'></div>
                <div className='hero-vid-container'>
                    <video src={"http://localhost:8000/"+data.hero_vid} autoPlay loop muted className='hero-vid'></video>
                </div>
                <div className='hero-title'>
                    <h1 className='font-spcase-large font-weight-bold'>{data.hero_title}</h1>
                    <br></br>
                    <p className='font-size-large'>{data.hero_tagline}</p>
                </div>
            </div>
            <div className='home-sub-content'>
                <Container className='w-75 home-container' fluid>
                    <Row className="align-items-center justify-content-center justify-content-lg-evenly">
                        <Col lg={6} md={12} className="mb-3 mb-lg-0">
                        <Image src={"http://localhost:8000/"+data.logo} fluid className="img-fluid rounded-lg" />
                        </Col>
                        <Col lg={6} md={12}>
                        <Row className="text-center text-md-start">
                            <Col>
                            <h2 className='font-weight-bold font-spcase-large'>WHO WE ARE</h2>
                            <br></br>
                            <p>
                                {data.description}
                            </p>
                            <br></br>
                            </Col>
                        </Row>
                        <Row className="justify-content-center justify-content-md-start">
                            <Col>
                                <a className="font-size-large font-weight-bold a-btn-style-1" href="#">About Us</a>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Home