import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Header(){
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return(
        <>
            <div className={`navbar-main-container ${isScrolled ? 'scrolled' : ''}`}>
            <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="">
                <Container>
                    <img className="logo" src="/assets/eagles-nobg-logo.png"></img>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav className='navbar_wrapper'>
                        <Link to="/rmmec" className='mt-2'>Home</Link>
                        <Link to="/rmmec/announcements" className='mt-2'>Announcements</Link>
                        <Link to="/rmmec/projects" className='mt-2'>Projects</Link>
                        <NavDropdown title="Clubs" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="/">Eagles Club</NavDropdown.Item>
                            <NavDropdown.Item href="/rmmec">RMMEC</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MMEC</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">LBAEC</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">RMMELC</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBEAC</NavDropdown.Item>
                        </NavDropdown>
                        <Link to="/rmmec/about" className='mt-2'>About</Link>
                        <Link to="/rmmec/register" className='mt-2'><span className='register-btn'>Register</span> </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header