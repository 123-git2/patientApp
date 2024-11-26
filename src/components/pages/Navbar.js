import React from "react";
import "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/css-styles/Navbar.css";
import Logo from "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/images/logo.jfif";
import Doc from "C:/Users/LenovoT480/Desktop/patients-info/src/components/assets/images/dr-jose.jpg";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                <img src={Logo} alt="Logo" />
            </div>
            <div className="nav-links">
                <ul>
                    <li><a href="/overview">Overview</a></li>
                    <li><a href="/patients">Patients</a></li>
                    <li><a href="/schedule">Schedule</a></li>
                    <li><a href="/message">Message</a></li>
                    <li><a href="/transactions">Transactions</a></li>
                </ul>
            </div>
            <div className="user-info">
                <img src={Doc} alt="Dr. Jose Simmons" className="user-image" />
                <div className="user-details">
                    <p className="user-name">Dr. Jose Simmons</p>
                    <p className="user-position">General Practitioner</p>
                </div>
            </div>
            <div className="user-actions">
                <button className="settings-btn"><i className="fas fa-cog"></i></button>
                <button className="dots-btn"><i className="fas fa-ellipsis-v"></i></button>
            </div>
        </nav>
    );
}

export default Navbar;
