import React, { useEffect, useState } from 'react'
import { authToken } from '../../root/pages/loginauth';
import axios from 'axios';
import StoryModal from './StoryModal';

const StoryCard = ({ data,value,show}) => {
    const [storyimage,setStoryimage] = useState();
    const[loading,setLoading]= useState(true)
    const [close, setClose] = useState(false);

    const getStoryimage = async () => {
        try {
            if (localStorage.getItem("jwtToken")) {
                authToken(localStorage.getItem("jwtToken"));
                const response = await axios.get(`http://localhost:8080/api/v1/auth/story/image/${data.imageName}`, {
                    responseType: 'blob'
                });
                const imageUrl = URL.createObjectURL(response.data);
                setStoryimage(imageUrl);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        getStoryimage();
    }, []);

    if (loading) {
        return <div>loading</div>;
    }

  return (
    <>

    <div  className="story" onClick={()=>{setClose(true)}}>
        <img src={storyimage} alt=""  />
        <span>{data.user.firstName} {data.user.lastName}</span>
    </div>

    <StoryModal image={storyimage} show={close} onClose={()=>{setClose(false)}}/>


  </>
  )
}

export default StoryCard
