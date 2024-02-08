import React, { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"


const Header = ({islogin}) => {
    const navigate = useNavigate()
    const cardata = localStorage.getItem("user")

    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/signin')
    }


    return (
        <>
            <div className='main'>
                <div className=''>
                <Link > Basic Details</Link>
                </div> 
                <div className=''>
                <Link > Address Details</Link>

                </div> 
                <div className=''>
                <Link > Personal Details</Link>

                </div>
            </div>
           
        </>
    )
}



export default Header;
