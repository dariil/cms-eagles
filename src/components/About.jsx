import React from 'react';
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function About(){
    return(
        <>
        <Header></Header>
        <div className='about-main-container'>
            <div className="about-image-container" style={{ backgroundImage: 'url(/assets/eagle-bg.jpg)' }}>
                <h1>The Fraternal Order of Ealges - Philippine Eagles</h1>
            </div>

        </div>
        <div>
            <Container className='w-75 home-container' fluid>
                <Row className="align-items-center justify-content-center justify-content-lg-evenly">
                <Col lg={6} md={12}>
                        <Row className="text-center text-md-start">
                            <Col>
                                <h2 className='font-weight-bold font-spcase-large'>Our Vision</h2>
                                <br></br>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                                <br></br>
                            </Col>
                        </Row>
                        <Row className="justify-content-center justify-content-md-start">
                            <Col>
                                <a className="font-size-large font-weight-bold a-btn-style-1" href="#">Join us</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={6} md={12} className="mb-3 mb-lg-0">
                        <Image src="/assets/eagles-nobg-logo.png" fluid className="img-fluid rounded-lg" />
                    </Col>
                </Row>
            </Container>
            <div className='our-mission-main-container'>
                <div className="blog" style={{ backgroundImage: 'url(/assets/placeholder_img.png)' }}></div>
                <div className='our-mission-text-container'>
                <h2 className='font-weight-bold font-spcase-large'>Our Mission</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default About;