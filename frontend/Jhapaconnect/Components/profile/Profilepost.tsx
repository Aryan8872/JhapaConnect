import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { authToken } from '../../root/pages/loginauth';
import { useNavigate } from 'react-router-dom';

const Profilepost = ({imageName , postid}) => {

    const [image, setImage] = useState();
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();


    const [name,setName] = useState();
  const getPostimage = async () => {
    try {
        if (!imageName) {
            // Handle the case where imageName is undefined
            return;
          }
        if(localStorage.getItem("jwtToken")){
            authToken(localStorage.getItem("jwtToken"))
            const response = await axios.get(`http://localhost:8080/api/v1/auth/post/image/${imageName}`, {
                responseType: 'blob'
                  
            }
            )
            const imageUrl = URL.createObjectURL(response.data);
            setImage(imageUrl);
            setLoading(false);
        }      
    } catch (error) {
      // Handle errors
      setLoading(false);
    }
  }
  console.log(image)

  useEffect(()=>{
    getPostimage()
  },[])

  if(loading){
    return <div>loading</div>
}
  return (   
    <div className='user-post' onClick={()=>{navigate(`/post/${postid}`)}}>
      <div className='profile-post'>
        <img src={image} />

      </div>
  </div>
  )
}

export default Profilepost
