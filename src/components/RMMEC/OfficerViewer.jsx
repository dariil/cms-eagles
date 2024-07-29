import Header from './Header'
import Footer from './Footer'
import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';

function RMMECOfficerViewer(){
    const [officer, setOfficer] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch(`http://127.0.0.1:8000/api/getOneOfficer/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let result = await response.json();
                console.log(result);
                // Wrap the result in an array if it's not already an array
                setOfficer(Array.isArray(result) ? result : [result]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [id]);

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

    const renderContent = (content) => {
        return content.split('\n').map((paragraph, index) => (
            <p key={index} className="post-view-intro">{paragraph}</p>
        ));
    };

    return(
        <>
            <Header />
            {officer.map((officer, index) => (
                <div key={index} className="post-view-main-container">
                    <div className="view-post-category-tag">
                        <p className=""><strong>Posted on </strong><u><span className="post-view-date">{formatDate(officer.created_at.split('T')[0])}</span></u></p>
                    </div>
                    <div className="post-img" style={{ backgroundImage: `url('http://127.0.0.1:8000/${officer.official_image}')` }}></div>
                    <div className="post-view-content-container">
                        <h2 className="">{officer.official_name}</h2>
                        <hr />
                           {renderContent(officer.official_description)}
                        <hr />
                    </div>
                </div>
            ))}
            <Footer />
        </>
    )
}

export default RMMECOfficerViewer;