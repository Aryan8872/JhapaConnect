import React from 'react'
import "./itempreview.css"
import { Link } from 'react-router-dom'

const Itempreview = () => {
  return (
    <div className='item_preview'>
      <div className='preview_container'>
        <div className='preview_image_container'>
          <section className='preview_image'>
            <img src="/assets/icons/connect.png" />
          </section>
        </div>

        <section className='right_detail'>

          <div style={{width:"100%"}}>
            <div className='post_head'>

              <Link to="/profile" style={{ textDecoration: "none", color: "black", display: "flex", gap: "0.3rem" }}>
                <img src="assets/icons/connect.png" height={32} width={32} />
                <span style={{ fontSize: "14px", display: "flex", flexFlow: "column wrap" }}>
                  firstName lastName
                  <span style={{ fontSize: "12px", color: "#737373" }}>
                    {/* <FontAwesomeIcon icon="fa-thin fa-location-dot" style={{color: "#0d0d0d",}} /> */}
                    location
                  </span>


                </span>
                <span>.</span>

                <span style={{ fontSize: "14px", color: "#737373" }}>addedDate</span>

              </Link>

            </div>

            <div className='post_details'>

              <div className='description_section'>
                description
              </div>

              <div className='tags'>
                {/* { tags.length !=1?
                     tags.map((tag,key)=>( */}
                <span style={{ color: "#00376B" }} >#tag,</span>

                {/* )):<span></span>} */}
              </div>

              <div className='right_lower'>
                <div className='like_section'>
                  <button className='post_interaction_btn' ><img src="/assets/icons/like.png" /></button>
                  <Link to="" className='post_interaction_btn'><img src="/assets/icons/comment.png" /></Link>
                </div>

                <section className='like_section' > 0 likes</section>
                <form className='post_preview_form'>
                  <input placeholder='Add comment' />
                  <button>Comment</button>
                </form>
              </div>



            </div>

            <hr />
          </div>

          <div className='post_cmts'>

            <div  className='cmt_container'>

              <div className = "user_photo">
                <img src='/assets/icons/connect.png'/>
              </div>

              <div className='comment'>
                <span className='commenter'>Commentator</span>
                
                <div className='comment_text'>
                  kajwdkjawndkanwkdjjjjjjjjjjjjjjjjaaadnawdakwdjkwadjkakdw
                </div>

              </div>


            </div>




          </div>


        </section>

      </div>

    </div>



  )
}

export default Itempreview
