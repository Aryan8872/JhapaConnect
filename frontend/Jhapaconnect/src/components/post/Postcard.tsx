import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import './postcard.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from 'axios'
import { ZodType, z } from 'zod'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { authToken } from '../../../root/pages/loginauth'
import EditPost from './EditPost'
import { Bounce, toast } from 'react-toastify'

const Postcard = ({ props,key }) => {
    const navigate = useNavigate();
    console.log(props)
    const localStorageData = localStorage.getItem('data');

    const parsedData = JSON.parse(localStorageData);
  
    const userData = parsedData.data.user;
  
    const userId = userData.id;
    const firstname = userData.firstName;
    const lastname = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;
   
  
    const { addedDate, description, id, imageName, location, tags, user } = props;
    const [image, setImage] = useState(" "); 
    const [showOptions, setShowOptions] = useState(false);
    const {firstName,lastName} = user
    const{register,handleSubmit} = useForm()
    const [openEdit, setOpenEdit] = useState(false);
    const[liked,setLiked] = useState(false)
    const[likecount,setLikecount] = useState([])
    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0);


    const getPostlike = async ()=>{
        await axios.get(`http://localhost:8080/api/v1/auth/getlikes/${id}`).then((res)=>{
            console.log(res.data)
            setLikecount(res.data)
        })

    }
    useEffect(()=>{
        getPostlike()
    },[])

  


    const createComment = useMutation({
        mutationKey: "CREATECOMMENT",
        mutationFn: (data) => {
            if (localStorage.getItem("jwtToken")) {
                authToken(localStorage.getItem("jwtToken"));
            }
            return axios.post(`http://localhost:8080/api/v1/auth/comment/post/${id}/${userId}/comments`, data)
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
  

     const handleLikePost = async (postId) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/auth/like/${postId}/${userId}`).then((res)=>{
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
            await axios.put(`http://localhost:8080/api/v1/auth/dislike/${postId}/${userId}`, {
        
            }).then(()=>{
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
    } 

    const handleLike = (postId) => {
        !liked &&
            handleLikePost(postId);
        liked &&
        handleDislike(postId)
        // window.location.reload();
    }

    const submitComment = (data) => {
        createComment.mutate(data);
    };

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getPostImage = async () => {
            if(imageName){
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/auth/post/image/${imageName}`, {
                    responseType: 'blob'
                });
                const imageUrl = URL.createObjectURL(response.data);
                setImage(imageUrl);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        }
        else{
            setImage("/assets/icons/connect.png")
        }
        
        };

        getPostImage();
    }, []); // Empty dependency array to run the effect only once

  



    return (
        <>
        <div className='post-card' key={key}>
            <div className='posts'>
                <div className='post_head'>
                    <div className='post_head_user_div'>
                        <img src="assets/icons/connect.png" height={32} width={32} />
                        <div style={{ fontSize: "14px", display: "flex", flexFlow: "column wrap" }}>
                            <div onClick={()=>{navigate(`/profile/${user.id}`)}} style={{ textDecoration: "none",cursor:"pointer", color: "black", display: "flex", gap: "0.3rem" }}>
                                <span>{firstName} </span>
                                <span>{lastName}</span>
                            </div>

                            <span style={{ fontSize: "12px", color: "#737373" }}>
                                {location}
                            </span>


                        </div>

                    </div>

                    <span>.</span>

                    <span className='post_date'>{addedDate}</span>

                    { firstname === firstName && lastname=== lastName &&
                    <div className='options_icon' onClick={()=>{ !showOptions ? setShowOptions(true) :setShowOptions(false)}}>
                        <img src="assets/icons/options.png" />
                    </div>
                    }
                    {
                        showOptions &&  
                        <div className='options_tray'>
                            <span className='edit_post'  onClick={()=>{
                                setOpenEdit(true)
    
                                }}>
                            <img src='assets/icons/edit.png' width={25} height={25}/>
                                Edit post
                                </span>
                            <hr/>
                            <span className='delete_post' >
                                <img src='assets/icons/delete.png' width={25} height={25}/>
                                Delete post
                            </span>
                        </div>
                    }
                   


                </div>
                <div className='post-image'>
                    <img src={image} onClick={() => (navigate(`/post/${id}`))} />
                </div>

                <div className='post_footer'>

                    <div className='post_description_section'   >
                        {description}
                    </div>
                    <div className='like-div' key={key}>
                        <img src="/assets/icons/heart.png"  onClick={ async ()=>{
                            await handleLike(id)
                            setLikecount(prevCount => prevCount + (liked ? -1 : 1));
                                                    }} 
                            style={{backgroundColor:liked ? "red":"white" }} height={30} width={30}/>

                        <span>{likecount}</span>
                    </div>

                    <div className='tags'>
                        {tags.length != 1 ?
                            tags.map((tag, key) => (
                                <span style={{ color: "#00376B" }} key={key}>#{tag},</span>

                            )) : <span></span>}
                    </div>

                    <div className='cmt_section'>
                        <form onSubmit={handleSubmit(submitComment)}>
                            <input placeholder='Add comment'  {...register("content")} />
                            <button>Comment</button>
                        </form>
                    </div>

                </div>


            </div>


        </div>
        <EditPost description={description} id={id} location={location} tags={tags} onClose={()=>{(setOpenEdit(false))}} model={openEdit}/>
        </>
    )

}

export default Postcard
