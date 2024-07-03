import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import Slider from 'react-slick';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Announcements(){
    const [latestAnnouncement, setLatestAnnouncement] = useState([]); /////   IMPORTANT    //////
    const [data, setData] = useState([]); /////   IMPORTANT    //////

    useEffect(() =>{
        getLatestAnnouncement();
        getData();
    }, []);

    async function getLatestAnnouncement(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentAnnouncement/0`).then(function(response){
            console.log(response.data[0]);
            setLatestAnnouncement(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/0`).then(function(response){
            // console.log(response.data);
            setData(response.data);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        console.log(latestAnnouncement.title);
    }, [data]);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
          
          
          {
            breakpoint: 1439,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
      };

    return(
        <>
        <Header></Header>
            <div>
                <Container className='w-75 home-container' fluid>
                    <Row className="align-items-center justify-content-center justify-content-lg-evenly">
                        <Col lg={6} md={12} className="mb-3 mb-lg-0">
                        <Image src={"http://localhost:8000/"+latestAnnouncement.cover_image} fluid className="img-fluid rounded-lg" />
                        </Col>
                        <Col lg={6} md={12}>
                        <Row className="text-center text-md-start">
                            <Col>
                            <h2 className='font-weight-bold font-spcase-large'>Latest News</h2>
                            <br></br>
                            <h2 className='font-weight-bold font-size-large'>
                            {latestAnnouncement && latestAnnouncement.created_at && (
                                <>
                                    <h2 className='font-weight-bold font-size-large'>{latestAnnouncement.created_at.split('T')[0]}</h2>
                                    <br />
                                </>
                            )}    
                            </h2>
                            <br></br>
                            <p>
                            {latestAnnouncement.description}
                            </p>
                            <br></br>
                            </Col>
                        </Row>
                        <Row className="justify-content-center justify-content-md-start">
                            <Col>
                                <a className="font-size-large font-weight-bold a-btn-style-1" href="#">Learn more</a>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                </Container>
                {/* IMPLEMENT CARD SLIDER BELOW */}
                <div className='carousel-main-container'>
                <div className='carousel-container'>
                    <Slider {...settings}>
                        {
                            data.map((item, index) => (
                                <div className='box' key={index}>
                                    <div className="blog-post-image" style={{ backgroundImage: `url(http://localhost:8000/${item.cover_image})` }}></div>
                                    <h3 className='font-weight-bold mt-3'>{item.title}</h3>
                                    <div className='announcement-content-container'>
                                        <p className='announcment-content'>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className='read-more-container mt-4'>
                                        <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                </div>
            </div>
        <Footer></Footer>
        </>
    )
}

export default Announcements