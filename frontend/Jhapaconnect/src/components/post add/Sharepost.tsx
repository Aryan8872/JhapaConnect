import React from 'react'
import './share.css'

const Sharepost = () => {
  return (
    <div className="post-sharing">
  <div className="post-sharing-container">
    <div className="post-sharing-top">
      <img
        src=""
        alt="profilepic"
      />
      <input type="text" placeholder={`What's on your mind aryan`} />
    </div>
    <hr />
    <div className="post-sharing-bottom">
      <div className="post-sharing-left">
        <input type="file" id="file" style={{display:"none"}} />
        <label htmlFor="file">
          <div className="post-sharing-item">
            <img src="" alt="" />
            <span>Add Image</span>
          </div>
        </label>
        <div className="post-sharing-item">
          <img src="" alt="" />
          <span>Add Place</span>
        </div>
       
      </div>
      <div className="post-sharing-right">
        <button>Share</button>
      </div>
    </div>
  </div>
</div>

  )
}

export default Sharepost
