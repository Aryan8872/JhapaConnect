import React, { useEffect, useState } from 'react'
import "./postpreview.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { type } from 'os'
import { useMutation } from 'react-query'
import { authToken } from '../../../root/pages/loginauth'
import { Bounce, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'

const Postpreview = () => {

  const navigate = useNavigate();
  const localStorageData = localStorage.getItem('data');
  const parsedData = JSON.parse(localStorageData);
  const userData = parsedData.data.user;
  const userId = userData.id;

  const [image, setImage] = useState(" "); 
  const{register,handleSubmit} = useForm()
  const [openEdit, setOpenEdit] = useState(false);
  const[liked,setLiked] = useState(false)
  const[likecount,setLikecount] = useState([])
  const[postdata,setData] = useState([])




  const pid = useParams()
  const postid = pid.postId
  

  const getPostlike = async ()=>{
    await axios.get(`http://localhost:8080/api/v1/auth/getlikes/${postid}`).then((res)=>{
        console.log(res.data)
        setLikecount(res.data)
    })

}
useEffect(()=>{
  getPostlike()

})

  const getPostdata = async (pid) => {
    try {
      const dataRespone = await axios.get(`http://localhost:8080/api/v1/auth/post/${postid}`).then((res)=>{
      
        getPostImage(res.data.imageName)
        setData(res.data);


      });
     
      console.log(postdata)

    }
    catch (error) {
      console.log(error)
    }

  }
  useEffect(() => {
    getPostdata(pid)

  }, [pid])

  const { addedDate, category, comments, description, imageName, location, tags, user } = postdata;
  const { firstName, uid, lastName } = user || {};
  
  console.log(imageName)

 

  if (!postdata) {
    return <div>Loading...</div>;
  }


  const createComment = useMutation({
    mutationKey: "CREATECOMMENT",
    mutationFn: (data) => {
        if (localStorage.getItem("jwtToken")) {
            authToken(localStorage.getItem("jwtToken"));
        }
        return axios.post(`http://localhost:8080/api/v1/auth/comment/post/${postid}/${userId}/comments`, data)
            .then((res) => {
                console.log(res.data);
                toast.success('✅ Commented sucessfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  });
                
            });
    }
});



const handleLikePost = async (postid) => {
    try {
        await axios.post(`http://localhost:8080/api/v1/auth/like/${postid}/${userId}`).then((res)=>{
            setLiked(true)
        });
        toast.success('✅ Post Liked sucessfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        
    }
    catch (error) {
        console.error("Error liking post:", error);
    }
};

const handleDislike = async(postId) =>{
    try {
        await axios.put(`http://localhost:8080/api/v1/auth/dislike/${postId}/${userId}`, {}).then(()=>{
            setLiked(false)
        });

        toast.success('✅ Post disliked sucessfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
    } catch (error) {
        console.error("Error saving like:", error);
    }
}; 

const handleLike = (postid) => {
    !liked && handleLikePost(postid);
    liked && handleDislike(postid);
};

const submitComment = (data) => {
  createComment.mutate(data);
}



    const getPostImage = async (imageName) => {
        if(imageName){
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/post/image/${imageName}`, {
                responseType: 'blob'
            });
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
        } catch (error) {
         
        }
    }
    else{
        setImage("/assets/icons/connect.png")
    }
    
    };

 // Empty dependency array to run the effect only once
console.log(image)

console.log(comments)

  console.log(postdata)
  return (
    <div className='item_preview'>
      <div className='preview_container'>
        <div className='preview_image_container'>
          <section className='preview_image'>
            <img src={image} />
          </section>
        </div>

        <section className='right_detail'>

          <div className='right_upper_container' style={{ width: "100%" }}>
            <div className='post_head'>
              <section>
                <img src='/assets/icons/profileuser.png' height={32} width={32} />
                <span style={{ fontSize: "14px", display: "flex", flexFlow: "column wrap" , width:"max-content" }}>
                <div onClick={()=>{navigate(`/profile/${user.id}`)}} style={{ textDecoration: "none", color: "black", cursor:"pointer", display: "flex" , gap: "0.8rem" }}>

                  <span>{firstName}</span> 
                  <span>{lastName}</span>
                </div>
                  <span style={{ fontSize: "12px", color: "#737373" }}>
                    {/* <FontAwesomeIcon icon="fa-thin fa-location-dot" style={{color: "#0d0d0d",}} /> */}
                    {location}
                  </span>


                </span>
                <span>.</span>

                <span style={{ fontSize: "14px", color: "#737373" }}>{addedDate}</span>

              </section>

                

              

            </div>

            <div className='post_details'>

              <div className='description_section'>
                {description}
              </div>

              <div className='tags'>
                { tags && tags.length >= 1 ?
                  tags.map((tag, key) => (
                    <span style={{ color: "#00376B" }} key={key}>#{tag},</span>

                  )) : <span></span>}
              </div>

              <div className='right_lower'>
                <div className='like_section' onClick={()=>{handleLike(postid)}}>
                  <button className='post_interaction_btn' onClick={()=>{handleLike}} ><img src="/assets/icons/heart.png" /></button>
                </div>

                <section className='like_count' > {likecount} likes</section>
                <form className='post_preview_form' onSubmit={handleSubmit(submitComment)}>
                  <input placeholder='Add comment' {...register("content")}/>
                  <button type='submit'>Comment</button>
                </form>
              </div>



            </div>

            <hr />
            <div className='post_cmts'>
            {comments && comments.map((data, key) => (
              <div className='cmt_container' key={key}>
                <div className="user_photo">
                  <img src='/assets/icons/profileuser.png' />
                </div>
                <div className='comment'>
                  <span className='commenter' onClick={()=>{navigate(`/profile/${data.user&& data.user.id}`)}}>{data.user && data.user.firstName} {data.user && data.user.lastName}</span>

                  <div className='comment_text'>
                    {data.content}
                  </div>
                </div>
              </div>
  ))}

            </div>
          </div>




        </section>

      </div>

    </div>



  )
}

export default Postpreview
