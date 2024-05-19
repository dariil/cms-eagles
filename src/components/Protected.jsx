import {BrowserRouter, Route, Routes} from 'react-router-dom'
import React, {useState, useEffect} from 'react'
import {useNavigate } from 'react-router-dom';

function Protected(props){
    const Component = props.component;
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user-info')){
            navigate("/login");
        }
    }, [])
    return(
        <>
            <div>
                <Component />
            </div>
        </>
    )
}

export default Protected;