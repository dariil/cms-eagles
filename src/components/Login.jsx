import Header from './Header'
import Footer from './Footer'
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import {useNavigate } from 'react-router-dom';
import { message } from 'antd';
import React, {useState, useEffect} from 'react';
import {
    LoadingOutlined,
  } from '@ant-design/icons';

function Login(){
    const [inputs, setInputs] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    useEffect(() => {
        if(localStorage.getItem('user-info')){
            navigate('/admin')
        }
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        message.loading("Logging in...");
        axios.post('http://127.0.0.1:8000/api/login', inputs).then(function(response){
            console.log(response.data);
            setLoading(false);
            if(response.data.messages.status == 0){
                message.error(response.data.messages.message);
            }else{
                localStorage.setItem("user-info", JSON.stringify(response.data));
                message.success(response.data.messages.message);
                navigate('/admin');
            }
        });
    }

    return(
        <>
            <div className='login-main-container'>
                <div className='logo-container'>
                    <Image src="/assets/eagles-nobg-logo.png" fluid className="login-logo-img" />
                </div>
                <div className='login-container'>
                    <Form className='login-form' onSubmit={handleSubmit}>
                            <div className=''>
                                <h1 className='login-text-title'>Login</h1>
                                <p className='login-desc'>Welcome! Please login to your account.</p>
                            </div>
                            <Col className='form-col'>
                                <Form.Group className="mb-5">
                                    <Form.Label htmlFor="email" className='login-label'>Email address</Form.Label>
                                    <Form.Control className='login-input' type="email" name="email" id="email" onChange={handleChange}  placeholder="Enter email" />
                                </Form.Group>
                                        
                                <Form.Group className="mb-5">
                                    <Form.Label htmlFor="password" className='login-label'>Password</Form.Label>
                                    <Form.Control className='login-input' type="password" name="password" id="password" onChange={handleChange}  placeholder="Password" />
                                </Form.Group>

                                        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Check me out" />
                                        </Form.Group> */}
                                        
                                <Button variant="primary" className='login-btn' type="submit">
                                    {
                                        loading ? <LoadingOutlined /> : "Login"
                                    }
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