import React, { useEffect, useState } from 'react'
import "./eventcard.css"
import axios from 'axios';
import { authToken } from '../../root/pages/loginauth';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
const EventCard = ({props}) => {
  const [eventImage,setEventimage] = useState();
  const [loading,setLoading] = useState(true);
  const[startdate,setStartdate] = useState();
  const[enddate,setEnddate] = useState();
  const[Interest,setInterest] = useState(false);
  const[Going,setGoing] = useState(false);
  const navigate =useNavigate();
  const{addedDate,description,endDate,going,id,imageName,interested,location,startDate,title} = props
  
  useEffect(()=>{
    setStartdate(new Date(startDate).toLocaleDateString());  //we cannot directly render Date type in react so we need to connvert it 
    setEnddate(new Date(endDate).toLocaleDateString());
    getEventimage();
  
  },[imageName])
  console.log(imageName)
  const getEventimage= async ()=>{
    try {
      if(localStorage.getItem("jwtToken")){
        authToken(localStorage.getItem("jwtToken"))
        const response = await axios.get(`http://localhost:8080/api/v1/auth/event/image/${imageName}`, {
            responseType: 'blob' 
        }).then((res)=>{
          const imageUrl = URL.createObjectURL(res.data);
          setEventimage(imageUrl);
          setLoading(false);
        })
      
      
      };      
    } catch (error) {
        setLoading(false);
    }
}

const handleInterest = async (eventId) => {
  try {
      await axios.post(`http://localhost:8080/api/v1/auth/interested/${eventId}`).then((res)=>{
          setInterest(true)
      });
      toast.success('✅ Interested sucessfully!', {
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

const handleGoing = async (eventId) => {
  try {
      await axios.post(`http://localhost:8080/api/v1/auth/going/${eventId}`).then((res)=>{
          setGoing(true)
      });
      toast.success('✅ Going sucessfully!', {
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



const handleNotintereset = async(eventId) =>{
  try {
      await axios.put(`http://localhost:8080/api/v1/auth/notinterest/${eventId}`, {
  
      }).then(()=>{
          setInterest(false)
      });

      toast.success('✅ Not interested sucessfully!', {
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


const handleNotgoing = async(eventId) =>{
  try {
      await axios.put(`http://localhost:8080/api/v1/auth/notgoing/${eventId}`, {
  
      }).then(()=>{
          setGoing(false)
      });

      toast.success('✅ Not Going sucessfully!', {
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

const submitGoing = (eventId) => {
  !Going &&
      handleGoing(eventId);
  Going &&
  handleNotgoing(eventId)
  // window.location.reload();
}

const submitInterest = (eventId) => {
  !Interest &&
      handleInterest(eventId);
  Interest &&
  handleNotintereset(eventId)
  // window.location.reload();
}



if(loading){
  return <div>loading</div>
}




  return (
    <div className='event_content' >

    <div className='event_image' onClick={()=>{navigate(`/event-details/${id}`)}}>
      <img src={eventImage} alt="event image"/>
    </div>

    <div className='event_details'>

      <div style={{ display: "flex", flexFlow: "column wrap" }}>
        <span className='event_date'> {startdate}-{enddate}</span>
        <span className='event_address'>{title}</span>
      </div>


      <div style={{ display: "flex", gap: "1.1vmax" }} >
        <span className='interested'>{interested ? interested : 0} interested</span>
        <span className='going'>{going? going :0} going</span>
      </div>
    </div>

    <div className='events_button'>

      <button onClick={()=>{submitInterest(id)}}>
        <img src="assets/icons/interested.png" width={15} height={15} />
        <span style={{ fontSize: "16px" }}>Interested</span>
      </button>

      <button onClick={()=>{submitGoing(id)}}>
        <img src='assets/icons/going.png' width={25} height={25} />
        <span>Going</span>

      </button>

    </div>


  </div>


  )
}
export default EventCard
