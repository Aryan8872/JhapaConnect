import React from 'react'

const profile = () => {
  return (
    <div className="profile">
    <div className="images">
      <img
        src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt=""
        className="profile-cover"
      />
      <img
        src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
        alt=""
        className="profile-pic"
      />
    </div>
    <div className="profileContainer">
      <div className="uInfo">
        <div className="uInfo-left">
          <a href="http://facebook.com">
            <FacebookTwoToneIcon fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <InstagramIcon fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <TwitterIcon fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <LinkedInIcon fontSize="large" />
          </a>
          <a href="http://facebook.com">
            <PinterestIcon fontSize="large" />
          </a>
        </div>
        <div className="uInfo-center">
          <span>Jane Doe</span>
          <div className="info">
            <div className="info-item">
              <PlaceIcon />
              <span>USA</span>
            </div>
            <div className="info-item">
              <LanguageIcon />
              <span>lama.dev</span>
            </div>
          </div>
          <button>Follow</button>
        </div>
        <div className="uInfo-right">
          <EmailOutlinedIcon />
          <MoreVertIcon />
        </div>
      </div>
      <Posts/>
    </div>
  </div>
  
  )
}

export default profile
