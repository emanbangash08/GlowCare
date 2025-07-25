import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo/glow_care_logo.png";
import instagram_icon from "../Assets/icons/instagram_icon.png";
import pinterest_icon from "../Assets/icons/pinterest_icon.png";
import whatsapp_icon from "../Assets/icons/whatsapp_icon.png";

const Footer = () => {
    return (
        <div className="footer">
           <div className="footer-logo">
            <img src = {footer_logo} alt="" />
            <p>GLOW CARE</p>
            </div> 
            <ul className="footer-links">
                <li>Company</li>  
                <li>Products</li>  
                <li>Offices</li> 
                <li>About</li>  
                <li>Contact</li>     
            </ul> 
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src = {instagram_icon} alt="" />
                </div>

                <div className="footer-icons-container">
                    <img src = {pinterest_icon} alt="" />
                </div>

                <div className="footer-icons-container">
                    <img src = {whatsapp_icon} alt="" />
                </div>
            </div>
            <div className="footer-copyright">
                <hr/>
                <p>© 2024 GLOW CARE. All Rights Reserved.</p>
            </div>
        </div>
    );
}

export default Footer;