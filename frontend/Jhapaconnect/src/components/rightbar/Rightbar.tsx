import React from 'react'
import "./rightbar.css"

const Rightbar = () => {
    return (
        <div className="right-bar">
          <div className="container">
            <div className="item">
              <span>Suggestions For You</span>
              <div className="user">
                <div className="userInfo">
                  <img
                    src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
                    alt=""
                  />
                  <span>Jane Doe</span>
                </div>
                <div className="buttons">
                  <button>follow</button>
                  <button>dismiss</button>
                </div>
              </div>
              {/* More user items here */}
            </div>
            {/* More items here */}
          </div>
        </div>
    )
}

export default Rightbar
