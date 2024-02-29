import React, { useEffect, useState } from 'react'
import StoryModal from './StoryModal';
import "./story.css"

import CreateStory from '../Addstory/Createstory';
import { authToken } from '../../root/pages/loginauth';
import axios from 'axios';
import Createstory from '../Addstory/Createstory';
import StoryCard from './StoryCard';

const stories = () => {
  const [showStory ,SetShowStory] = useState(false);
  const [addStory,SetAddStory] =useState(false);
  const [stories,setStories] = useState([]);

  const getStories = async ()=>{
    if(localStorage.getItem("jwtToken")){
      authToken(localStorage.getItem("jwtToken"))
        axios.get("http://localhost:8080/api/v1/auth/stories").then((res)=>{
          setStories(res.data)
        })

      }
  }
  console.log(showStory)
  

  useEffect(()=>{
    getStories()
  },[])
 
    
      return (
        <>
        <div className="stories" >
          <div className="story">
              <img src="/assets/icons/connect.png" alt="userprofilepic" />
              <span>aryan</span>
              <button onClick={()=>{SetAddStory(true)}}>+</button>
            </div>
          {stories.map((story,key)=>(
           <StoryCard data={story} value={showStory} show={()=>{SetShowStory(true)}}/>
          ))}
        </div>

        <Createstory add= {addStory} onClose={()=>{SetAddStory(false)}}/>
        </>
      )
}

export default stories
