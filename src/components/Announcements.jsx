import React from 'react';
import Header from './Header'
import Footer from './Footer'
import Slider from 'react-slick';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Announcements(){
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
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            // breakpoint: 1439,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
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
        // prevArrow: <PrevArrow />,
        // nextArrow: <NextArrow />
      };

    return(
        <>
        <Header></Header>
            <div>
                <Container className='w-75 home-container' fluid>
                    <Row className="align-items-center justify-content-center justify-content-lg-evenly">
                        <Col lg={6} md={12} className="mb-3 mb-lg-0">
                        <Image src="/assets/philippine-flag-eagle.png" fluid className="img-fluid rounded-lg" />
                        </Col>
                        <Col lg={6} md={12}>
                        <Row className="text-center text-md-start">
                            <Col>
                            <h2 className='font-weight-bold font-spcase-large'>Latest News</h2>
                            <br></br>
                            <h2 className='font-weight-bold font-size-large'>November 10, 2023</h2>
                            <br></br>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    <div className='box'>
                        {/* <img className='announcement-img' src="/assets/placeholder_img.png"></img> */}
                        <div className="blog-post-image" style={{ backgroundImage: 'url(assets/placeholder_img.png)' }}></div>
                        <h3 className='font-weight-bold mt-3'>Title here</h3>
                        <div className='announcement-content-container'>
                            <p className='announcment-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                        <div className='read-more-container mt-4'>
                            <a className="font-weight-normal" href="#" dangerouslySetInnerHTML={{ __html: 'Read more &gt;' }}></a>
                        </div>
                    </div>
                    </Slider>
                </div>
                </div>
            </div>
        <Footer></Footer>
        </>
    )
}

export default Announcements