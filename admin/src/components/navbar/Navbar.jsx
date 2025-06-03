import React from "react";
import './Navbar.css';
import navlogo from '../../assets/logo/glow_care_logo.png';
import navProfile from '../../assets/nav_profile.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <img src={navlogo} alt="" className="nav-logo" />
            <img src={navProfile} alt="" className="nav-profile" />
            
        </div>
    )
}

export default Navbar;