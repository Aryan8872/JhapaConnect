import React, { useEffect, useState } from 'react'
import {Link} from"react-router-dom"
import './postcard.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Postcard = ({props}) => {
    const {addedDate, category,description,id,imageName,location,tags, user } = props; 
    // console.log(location)  
    // console.log(tags)
    // console.log(user)

    const{firstName,lastName} = user
    const{categoryTitle} = category

    const [Like, setLike] = useState(0);
    const [comment,setComment]= useState("")

    useEffect(()=>{

    },[] )

    const updateLike=(event)=>{
        setLike(Like+1)

    }

    const handleComment = (event)=>{
        setComment(event.target.value)

    }
    console.log(comment)

   

  

    
   
  return (
    <div className='post-card'>
        <div className='posts'>
            <div className='post_head'>
                <Link to="/profile" style={{textDecoration:"none", color:"black",display:"flex", gap:"0.3rem"}}>
                    <img src="assets/icons/connect.png" height={32} width={32}/>
                    <span style={{fontSize:"14px", display:"flex" , flexFlow:"column wrap"}}>
                        {firstName} {lastName}
                        <span style={{fontSize:"12px" , color:"#737373" }}>
                        {/* <FontAwesomeIcon icon="fa-thin fa-location-dot" style={{color: "#0d0d0d",}} /> */}
                            {location}
                        </span>


                    </span>
                    <span>.</span>

                    <span style={{fontSize:"14px", color:"#737373"}}>{addedDate}</span>

                </Link>
            </div>
            <div className='post-image'>
                <img src="assets/icons/market.png"/>
            </div>

            <div className='post_footer'>
                <div className='like_section'>
                    <button  className='post_interaction_btn' onClick={updateLike}><img src="assets/icons/like.png"/></button>
                    <Link to ="" className='post_interaction_btn'><img src="assets/icons/comment.png"/></Link>

                </div>

                <section className='like_section' > {Like} likes</section>

                <div className='description_section'>
                    {description}
                </div>

                <div className='tags'>
                    { tags.length !=1?
                     tags.map((tag,key)=>(
                        <span style={{color:"#00376B"}} key={key}>#{tag},</span>

                    )):<span></span>}
                </div>

                <div className='cmt_section'>
                    <Link to ="" style={{textDecoration:"none", color:"#737373"}}>View all comments</Link>
                    <form >
                        <input placeholder='Add comment' onChange={handleComment} />
                        <button>Comment</button>
                    </form>
                </div>

            </div>


        </div>
       
      
    </div>
  )
  
}

export default Postcard
