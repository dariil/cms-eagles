import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link, useNavigate} from 'react-router-dom'

function Header(){
    return(
        <>
            <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark" className="bg-body-tertiary">
                <Container>
                    <img className="logo" src="/assets/eagles-nobg-logo.png"></img>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        
                    </Nav>
                    <Nav className='navbar_wrapper'>
                        <Link to="/" className='mt-2'>Home</Link>
                        <Link to="/announcements" className='mt-2'>Announcements</Link>
                        <Link to="/projects" className='mt-2'>Projects</Link>
                        <NavDropdown title="Clubs" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">MMEC 1</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 2</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 3</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 4</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 5</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 6</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 7</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">MBMEC 8</NavDropdown.Item>
                        </NavDropdown>
                        {/* <NavDropdown title="About" id="collapsible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.2">Region</NavDropdown.Item>
                            <NavDropdown.Item><Link to="/projects" className='mt-2'>Eagles</Link></NavDropdown.Item>
                            <NavDropdown.Divider /> 
                        </NavDropdown> */}
                        <Link to="/about" className='mt-2'>About</Link>
                        <Link to="/register" className='mt-2'><span className='register-btn'>Register</span> </Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
            </div>
        </>
    )
}

export default Header