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
    const [secondLatestAnnouncement, setSecondLatestAnnouncement] = useState([]);
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
            setSecondLatestAnnouncement(response.data[1]);
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

    useEffect(() => {
        console.log(latestAnnouncement.title);
        // console.log(data[1].title);
    }, [data]);

    return(
        <>
        <div className="announcement-container">
        <Header></Header>
        <div className="announcement-main-container">
            <p className="latest-post-tag">Latest Announcements</p>
            <div className="latest-post-container">
                <div className="latest-large">
                    <a href="" className="announcement-prev-a">
                        <div className="latest-l-img" style={{ backgroundImage: `url('http://localhost:8000/${latestAnnouncement.cover_image}')` }}></div>
                        <div>
                            <h3 className="latest-blog-l-title">{latestAnnouncement.title}</h3>
                            <p>{latestAnnouncement.description}</p>
                        </div>
                        <div className="post-info-row">
                            <div className="date-posted">
                                {latestAnnouncement && latestAnnouncement.created_at && (
                                <p><strong>Created at: </strong>{formatDate(latestAnnouncement.created_at.split('T')[0])}</p>
                            )}
                            </div>
                        </div>
                    </a>
                </div>
                <div className="latest-small">
                    <a href="" className="announcement-prev-a">
                        <div className="latest-s-img" style={{ backgroundImage: `url('http://localhost:8000/${secondLatestAnnouncement.cover_image}')` }}></div>
                        <div>
                            <h3 className="latest-blog-l-title">{latestAnnouncement.title}</h3>
                            <p>{secondLatestAnnouncement.description}</p>
                        </div>
                        <div className="post-info-row">
                            <div className="date-posted">
                                {secondLatestAnnouncement && secondLatestAnnouncement.created_at && (
                                <p><strong>Created at: </strong>{formatDate(secondLatestAnnouncement.created_at.split('T')[0])}</p>
                                )}
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            <h2>Other Announcements</h2>
            <hr></hr>

            <div className="main-parent-flex-container">
                {
                    data.map((item, index) => (
                        <div className="child-content" key={index}>
                            <a className="announcement-prev-a" href="">
                            <div className="blog-post-image" style={{ backgroundImage: `url('http://localhost:8000/${item.cover_image}')` }}></div>
                                <h1 className="blogs-title">{item.title}</h1>
                                <p className="blogs-intro">{item.description}</p>
                                <div className="date-posted">
                                    <p><strong>Created at: </strong>{formatDate(item.created_at.split('T')[0])}</p>
                                </div>
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
        </div>
        <Footer></Footer>
        </>
    )
}

export default RMMECAnnouncements