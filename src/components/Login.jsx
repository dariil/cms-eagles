import Header from './Header'
import Footer from './Footer'
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Login(){
    return(
        <>
            <div className='login-main-container'>
                {/* <div className="login-image-container" style={{ backgroundImage: 'url(/assets/eagle-bg.jpg)', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'overlay'}}> */}
                <div className='logo-container'>
                    <Image src="/assets/eagles-nobg-logo.png" fluid className="login-logo-img" />
                </div>
                    {/* <h1 className='login-text-title-light'>Welcome!</h1>
                </div> */}
                <div className='login-container'>
                    <Form className='login-form'>
                            <div className=''>
                                <h1 className='login-text-title'>Login</h1>
                                <p className='login-desc'>Welcome! Please login to your account.</p>
                            </div>
                            <Col className='form-col'>
                                <Form.Group className="mb-5">
                                    <Form.Label htmlFor="email" className='login-label'>Email address</Form.Label>
                                    <Form.Control className='login-input' type="email" name="email" id="email"  placeholder="Enter email" />
                                </Form.Group>
                                        
                                <Form.Group className="mb-5">
                                    <Form.Label htmlFor="password" className='login-label'>Password</Form.Label>
                                    <Form.Control className='login-input' type="password" name="password" id="password"  placeholder="Password" />
                                </Form.Group>

                                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group> */}
                                        
                                <Button variant="primary" className='login-btn' type="submit">
                                    Login
                                </Button>
                            </Col>
                        </Form>
                    </div>
                    {/* <Image src="/assets/eagles-nobg-logo.png" fluid className="img-fluid rounded-lg" /> */}
                </div>
        </>
    )
}

export default Login;