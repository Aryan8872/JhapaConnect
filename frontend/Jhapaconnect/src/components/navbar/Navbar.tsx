import React from 'react'
import "./navbar.css";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-container">
    <div className="navbar-left">
      <Link to="/" style={{ textDecoration: "none", color:"black" ,display:"flex", gap:"1.2vmax" }}>
        <img src="/assets/icons/connect.png" alt = "people connect" height={30} />
        <span>People Connect</span>
      </Link>

      <div className="navbar-search">
        <input type="text" placeholder="Search..." />
      </div>
    </div>
    <div className="navbar-right">
    <img src='/assets/icons/compass.png' height={30} width={30} />

      <div className="navbar-user">
      <img src='/assets/icons/user.png' height={30} width={30} />

        <span>Aryan</span>
      </div>
    </div>
  </div>
  
  )
}

export default Navbar
