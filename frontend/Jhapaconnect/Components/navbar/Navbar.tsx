import React, { useState } from 'react'
import "./navbar.css";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const Logout = ()=>{
      localStorage.clear()
      navigate("/login")
      window.location.reload();
  }

  const localStorageData = localStorage.getItem('data');

  const parsedData = JSON.parse(localStorageData);

  const userData = parsedData.data.user;

  const userId = userData.id;
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const email = userData.email;
  const phoneNo = userData.phoneNo;
  const navigate = useNavigate();

  const [userImage,setUserImage] = useState()
  return (
    <div className="navbar-container">
      <div className="navbar-left">
        <Link to="/" style={{ textDecoration: "none", color: "black", display: "flex", gap: "1.2vmax" }}>
          <img src="/assets/icons/connect.png" alt="people connect" height={30} />
          <span>People Connect</span>
        </Link>
      </div>

      <div className='navbar-middle'>


        <div className='middle-nav-container'>
          <Link to="/" className='middle-nav'>
            <img src='/assets/icons/home.png' />

          </Link>

        </div>


        <div  className='middle-nav-container'>
          <Link to="/market" className='middle-nav'>
            <img src="/assets/icons/marketplace.png" width={28} height={28} />
          </Link>
        </div>

      

        <div  className='middle-nav-container'>
          <Link to="/events" className='middle-nav'>
            <img src="/assets/icons/Events.png"  width={28} height={28} />

          </Link>
        </div>

     



      </div>
      <div className="navbar-right">
        <div className="navbar-user" onClick={()=>{navigate("/user-profile")}}>
          <img src={`${userImage? userImage:"/assets/icons/profileuser.png"}`} height={30} width={30} />

          <span>{firstName} {lastName}</span>
        </div>
      </div>
      <div className='logout-nav' onClick={()=>{
        Logout()

      }}>
          <div>
            <img src='/assets/icons/logout.png' width={20} height={20}/>
            <span>Logout</span>
          </div>

        </div>
    </div>

  )
}

export default Navbar
