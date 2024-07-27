import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Slider from 'react-slick';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function Announcements(){
    const [latestAnnouncement, setLatestAnnouncement] = useState(null); /////   IMPORTANT    //////
    const [secondLatestAnnouncement, setSecondLatestAnnouncement] = useState(null);
    const [data, setData] = useState([]); /////   IMPORTANT    //////

    useEffect(() =>{
        getLatestAnnouncement();
        getData();
    }, []);

    async function getLatestAnnouncement(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getRecentAnnouncement/CLB-000001`).then(function(response){
                console.log(response.data[0]);
                const announcements = response.data;
                if (announcements.length > 0) {
                    setLatestAnnouncement(announcements[0]);
                }
                if (announcements.length > 1) {
                    setSecondLatestAnnouncement(announcements[1]);
                }
            });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    async function getData(){
        try {
            await axios.get(`http://127.0.0.1:8000/api/getAnnouncementsInClub/CLB-000001`).then(function(response){
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

    return(
        <>
        <div className="announcement-container">
        <Header></Header>
        <div className="announcement-main-container">
            <h5 className="latest-post-tag">Latest Announcements</h5>
            <div className="latest-post-container">
                {latestAnnouncement && (
                    <div className="latest-large">
                        <Link to={"view_announcement/"+latestAnnouncement.announcement_id} className="announcement-prev-a">
                            <div className="latest-l-img" style={{ backgroundImage: `url('http://localhost:8000/${latestAnnouncement.cover_image}')` }}></div>
                            <div>
                                <h3 className="latest-blog-l-title">{latestAnnouncement.title}</h3>
                                <p>{latestAnnouncement.description}</p>
                            </div>
                            <div className="post-info-row">
                                <div className="date-posted">
                                    {latestAnnouncement.created_at && (
                                    <p><strong>Created at: </strong>{formatDate(latestAnnouncement.created_at.split('T')[0])}</p>
                                )}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {secondLatestAnnouncement && (
                    <div className="latest-small">
                        <Link to={"view_announcement/"+secondLatestAnnouncement.announcement_id} className="announcement-prev-a">
                            <div className="latest-s-img" style={{ backgroundImage: `url('http://localhost:8000/${secondLatestAnnouncement.cover_image}')` }}></div>
                            <div>
                                <h3 className="latest-blog-l-title">{secondLatestAnnouncement.title}</h3>
                                <p>{secondLatestAnnouncement.description}</p>
                            </div>
                            <div className="post-info-row">
                                <div className="date-posted">
                                    {secondLatestAnnouncement.created_at && (
                                    <p><strong>Created at: </strong>{formatDate(secondLatestAnnouncement.created_at.split('T')[0])}</p>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}
            </div>

            <h5 className="latest-post-tag">Other Announcements</h5>
            <hr></hr>

            <div className="main-parent-flex-container">
                {
                    data.map((item, index) => (
                        <div className="child-content" key={index}>
                            <Link className="announcement-prev-a" to={"view_announcement/"+item.announcement_id}>
                            <div className="blog-post-image" style={{ backgroundImage: `url('http://localhost:8000/${item.cover_image}')` }}></div>
                                <h1 className="blogs-title">{item.title}</h1>
                                <p className="blogs-intro">{item.description}</p>
                                <div className="date-posted">
                                    <p><strong>Created at: </strong>{formatDate(item.created_at.split('T')[0])}</p>
                                </div>
                            </Link>
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

export default Announcements