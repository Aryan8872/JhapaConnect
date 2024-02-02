import React from 'react'
import "./leftbar.css"

const Leftbar = () => {
  return (
    <div className="left-bar">
  <div className="left-bar-container">
    <div className="left-bar-menu">
      <div className="left-bar-user">
        <img
          src=""
          alt="user image"
        />
        <span>Aryan</span>
      </div>
      <div className="left-bar-item">
        <img src="" alt="friends icon" />
        <span>Friends</span>
      </div>
      <div className="left-bar-item">
        <img src="" alt="groupsicon" />
        <span>Groups</span>
      </div>
      <div className="left-bar-item">
        <img src="" alt="marketicon" />
        <span>Marketplace</span>
      </div>
      <div className="left-bar-item">
        <img src="" alt="watchicon" />
        <span>Watch</span>
      </div>
      <div className="left-bar-item">
        <img src="" alt="memoryicon" />
        <span>Memories</span>
      </div>
    </div>
    <hr />
    <div className="left-bar-menu">
      <span>Your shortcuts</span>
      <div className="left-bar-item">
        <img src="" alt="events icon" />
        <span>Events</span>
      </div>

    </div>
    <hr />

  </div>
</div>

  )
}

export default Leftbar
