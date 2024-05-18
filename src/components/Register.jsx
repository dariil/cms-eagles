import Header from './Header'
import Footer from './Footer'
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Register(){
    return(
        <>
            <Header />
            <div className='about-main-container'>
                <div className="register-image-container" style={{ backgroundImage: 'url(/assets/eagle-bg.jpg)', backgroundColor: 'rgba(0, 0, 0, 0.5)', backgroundBlendMode: 'overlay'}}>
                    <div className='register-main-container'>
                        <Form>
                            <Container>
                                <Row className="justify-content-md-center">
                                <div><h1 className='register-text-title'>REGISTER</h1></div>
                                    <Col >
                                    
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="firstname" className='form-label-text-light'>First name</Form.Label>
                                            <Form.Control type="text" name="firstname" id="firstname"  placeholder="Enter your first name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="middlename" className='form-label-text-light'>Middle name</Form.Label>
                                            <Form.Control type="text" name="middlename" id="middlename"  placeholder="Enter your middle name" />
                                        </Form.Group>


                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="lastname" className='form-label-text-light'>Last name</Form.Label>
                                            <Form.Control type="text" name="lastname" id="lastname"  placeholder="Enter your last name" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="number" className='form-label-text-light'>Mobile number</Form.Label>
                                            <Form.Control type="text" name="number" id="number"  placeholder="Enter your number" />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="number" className='form-label-text-light'>Club membership</Form.Label>
                                            <Form.Select aria-label="Default select example">
                                                <option>Select the club you belong to</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </Form.Select>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="email" className='form-label-text-light'>Email address</Form.Label>
                                            <Form.Control type="email" name="email" id="email"  placeholder="Enter email" />
                                        </Form.Group>
                                        
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="password" className='form-label-text-light'>Password</Form.Label>
                                            <Form.Control type="password" name="password" id="password"  placeholder="Password" />
                                        </Form.Group>

                                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group> */}
                                        
                                        <Button variant="primary" className='w-100' type="submit">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </div>
                    <Image src="/assets/eagles-nobg-logo.png" fluid className="img-fluid rounded-lg" />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Register;