import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import Slider from 'react-slick';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function RMMECAnnouncements(){
    const [latestAnnouncement, setLatestAnnouncement] = useState([]); /////   IMPORTANT    //////
    const [data, setData] = useState([]); /////   IMPORTANT    //////

    useEffect(() =>{
        getLatestAnnouncement();
        getData();
    }, []);

    async function getLatestAnnouncement(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentAnnouncement/1`).then(function(response){
            console.log(response.data[0]);
            setLatestAnnouncement(response.data[0]);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/1`).then(function(response){
            // console.log(response.data);
            setData(response.data);
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    useEffect(() => {
        console.log(latestAnnouncement.title);
        // console.log(data[1].title);
    }, [data]);

    // const PrevArrow = (props) => {
    //     const { className, onClick } = props;
    //     return (
    //         <div className={className} onClick={onClick}>
    //             <i className="fas fa-chevron-left"></i>
    //         </div>
    //     );
    // };

    // // Custom Next Arrow Component
    // const NextArrow = (props) => {
    //     const { className, onClick } = props;
    //     return (
    //         <div className={className} onClick={onClick}>
    //             <i className="fas fa-chevron-right"></i>
    //         </div>
    //     );
    // };

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
        <div className="announcement-main-container">
            <p className="latest-post-tag">Latest Announcements (2)</p>
            <div className="latest-post-container">
                <div className="latest-large">
                    <div className="latest-l-img"></div>
                    <div>
                        <h3 className="latest-blog-l-title">Lorem Ipsum dolor amet.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <div className="post-info-row">
                        <div className="date-posted">
                            <p><strong>Mar 19, 2022</strong> at 10:25 PM</p>
                        </div>
                    </div>
                </div>
                <div className="latest-small">
                    <div className="latest-s-img"></div>
                    <div>
                        <h3 className="latest-blog-l-title">Lorem Ipsum dolor amet.</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                    <div className="post-info-row">
                        <div className="date-posted">
                            <p><strong>Mar 19, 2022</strong> at 10:25 PM</p>
                        </div>
                    </div>
                </div>
            </div>

        
            <div className="main-parent-flex-container">
                {
                    data.map((item, index) => (
                        <div className="child-content" key={index}>
                            <a className="announcement-prev-a" href="">
                            <div className="blog-post-image" style={{ backgroundImage: `url('http://localhost:8000/${item.cover_image}')` }}></div>
                                <h1 className="blogs-title">{item.title}</h1>
                                <p className="blogs-intro">{item.description}</p>
                                <div className="date-posted">
                                    <p><strong>Created at: </strong>{item.created_at.split('T')[0]}</p>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default RMMECAnnouncements