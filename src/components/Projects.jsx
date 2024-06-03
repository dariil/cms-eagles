import axios from "axios";
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

function Projects(){
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
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
                                <div className="project-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                                <p className={index%2==0 ? 'project-details-dark' : 'project-details-light'}>{item.project_description}</p>
                            </Col>
                        </Container>
                    </div>
                ))
            }
            {/* <div className='project-main-container-dark'>
                <Container className='w-75' fluid>
                    <Col>
                        <Row className='justify-content-between mb-2'>
                            <h1 className='w-50 project-name-dark font-spcase-large'>Project Title Here</h1>
                            <h1 className='w-50 project-date-dark font-size-larger'>October 10, 2023</h1>
                        </Row>
                        <div className="project-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <p className='project-details-dark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    </Col>
                </Container>
            </div>
            <div className='project-main-container-light'>
                <Container className='w-75' fluid>
                    <Col>
                        <Row className='justify-content-between mb-2'>
                            <h1 className='w-50 project-name-light font-spcase-large'>Project Title Here</h1>
                            <h1 className='w-50 project-date-light font-size-larger'>October 10, 2023</h1>
                        </Row>
                        <div className="project-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <p className='project-details-light'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    </Col>
                </Container>
            </div>
            <div className='project-main-container-dark'>
                <Container className='w-75' fluid>
                    <Col>
                        <Row className='justify-content-between mb-2'>
                            <h1 className='w-50 project-name-dark font-spcase-large'>Project Title Here</h1>
                            <h1 className='w-50 project-date-dark font-size-larger'>October 10, 2023</h1>
                        </Row>
                        <div className="project-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <p className='project-details-dark'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>
                    </Col>
                </Container>
            </div> */}
            <Footer></Footer>
        </>
    )
}

export default Projects