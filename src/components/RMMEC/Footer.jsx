import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import {
    FacebookFilled,
    InstagramFilled
  } from '@ant-design/icons';

function RMMECFooter(){
    return(
        <>
            <div className='footer'>
                <MDBFooter className='dimmed-background text-center text-lg-start text-muted'>
                    <section className='d-flex justify-content-center justify-content-lg-between'>
                        <div>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="facebook-f" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="twitter" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="google" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="instagram" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="linkedin" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon fab icon="github" />
                        </a>
                        </div>
                    </section>
                
                    <section className=''>
                        <MDBContainer className='text-center text-md-start mt-5'>
                            <MDBRow className='mt-3'>
                                <div className='footer-logo-container'>
                                    <img className="logo mb-3" src="/assets/eagles-nobg-logo.png"></img>
                                </div>
                                <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='footer-text text-uppercase fw-bold mb-4'>
                                    Eagles
                                </h6>
                                
                                <p className='footer-text'>TFOE-PE National Office, Malacañang Compound, J.P. Laurel Street. San Miguel Manila, Philippines</p>
                                <p className='footer-text'>thefraternalorderofeagles1979@gmail.com</p>
                                <p className='footer-text'>+63 999 123 4567</p> 
                                </MDBCol>

                                <MDBCol md="2" lg="2" xl="1" className='mx-auto mb-4'>
                                <h6 className='footer-text fw-bold mb-4'>Home</h6>
                                <p className='footer-text'>
                                    <a href='#!' className='footer-text text-reset'>
                                    About Us
                                    </a>
                                </p>
                                <p className='footer-text'>
                                    <a href='#!' className='footer-text text-reset'>
                                    Clubs
                                    </a>
                                </p>
                                <p className='footer-text'>
                                    <a href='#!' className='footer-text text-reset'>
                                    Projects
                                    </a>
                                </p>
                                <p className='footer-text'>
                                    <a href='#!' className='footer-text text-reset'>
                                    Location
                                    </a>
                                </p>
                                </MDBCol>

                                <MDBCol md="3" lg="2" xl="1" className='mx-auto mb-4'>
                                <h6 className='footer-text fw-bold mb-4'>Legal</h6>
                                <p className='footer-text'>
                                    <a href='#!' className='footer-text text-reset'>
                                    Privacy Policy
                                    </a>
                                </p>

                                </MDBCol>

                                <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                    <h6 className='footer-text fw-bold mb-4'>Get in touch</h6>
                                    <div className='fgit'>
                                        <FacebookFilled 
                                            style={{
                                                color: 'white',
                                                fontSize: 30,
                                                marginRight: 10
                                            }}
                                        />
                                        
                                        <InstagramFilled
                                             style={{
                                                color: 'white',
                                                fontSize: 30,
                                            }}
                                        />
                                        {/* <box-icon name='facebook-square' type='logo' color="white" size="md"></box-icon> */}
                                        {/* <box-icon type='logo' name='instagram-alt' color="white" size="md"></box-icon> */}
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </section>

                    <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    </div>
                </MDBFooter>
            </div>
        </>
    )
}

export default RMMECFooter