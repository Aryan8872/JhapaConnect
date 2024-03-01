import React, { useEffect, useState } from 'react'
import "./event-preview.css"
import Navbar from '../navbar/Navbar'
import EventsLeftbar from '../EventsLeftbar/EventsLeftbar'
import { useNavigate, useParams } from 'react-router-dom'
import { authToken } from '../../root/pages/loginauth'
import axios from 'axios'
import EventpreviewModel from './EventpreviewModel'
import Bottombar from '../BottomBar/Bottombar'
import { Bounce, toast } from 'react-toastify'
import { image } from 'html2canvas/dist/types/css/types/image'
const Eventpreview = () => {

    const [eventImage,setEventimage] = useState();
    const [loading,setLoading] = useState(true);
    const [eventdata,setEventdata] = useState([]);
    
    const [name,setName] = useState();
    const[options,showOptions] = useState(false);
    const[editModal,setEditModal] = useState(false);
    const[Interest,setInterest] = useState(false);
    const[Going,setGoing] = useState(false);
    const[startdate,setStartdate] = useState();
    const [ enddate,setEnddate]  = useState();
    const navigate =useNavigate();
    

    const Id = useParams();
    const eventId = Id.Id;
    const {addedDate,category,description,endDate,going,hostName,id,imageName,interested,invitationType,location,startDate,title,user}= eventdata
    const localStorageData = localStorage.getItem('data');

    const parsedData = JSON.parse(localStorageData);

    const userData = parsedData.data.user;

    const userId = userData.id;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;

    useEffect(()=>{
        getEventdata()

    },[eventId])
  
    const getEventdata = async ()=>{
        try {
            if(localStorage.getItem("jwtToken")){
              authToken(localStorage.getItem("jwtToken"))
              const response = await axios.get(`http://localhost:8080/api/v1/auth/event/${eventId}`).then((res)=>{
                setEventdata(res.data)
                console.log(res.data)
                setStartdate(new Date(res.data.startDate).toLocaleDateString());  //we cannot directly render Date type in react so we need to connvert it 
                setEnddate(new Date(res.data.endDate).toLocaleDateString());
              })
            
            
            };      
          } catch (error) {
              setLoading(false);
          }
    }

    useEffect(()=>{
        getEventimage();
      },[imageName])


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
const showEdit = ()=>{
    setEditModal(true)
}  
  if(loading){
    return <div>loading</div>
  }
  const deleteEvent =async ()=>{

    axios.delete(`http://localhost:8080/api/v1/auth/event/delete/${id}`).then(()=>{
        toast.success('✅ Deleted sucessfully!', {
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
    })
  }


  return (
    <>
    <Navbar/>
   
    <div className='event-detail-container'>
        <div className='upper-main-image-div'>
            <img src={eventImage}/>
        </div>

        <div className='event-details-body'>
            <div className='event-details-body-upper'>
                <div className='basic-details'>
                    <span className='date'>{startdate} </span>
                    <span className='name'>{title}</span>
                    <span className='location'>{location}</span>
                </div>
                <div className='event-details-body-upper-buttons'>
                    <button onClick={()=>{submitInterest(id)}}>
                        <img src="/assets/icons/interested.png" height={30} width={30}/>
                         Interested 
                    </button>
                    <button onClick={()=>{submitGoing(id)}}>
                        <img src="/assets/icons/going.png" height={30} width={30}/>

                        Going
                    </button>
                    { user.firstName === firstName && user.lastName === lastName &&
                    <button className='options-button' onClick={()=>{!options ? showOptions(true) :showOptions(false)}}>...</button>
                    }
                    {options &&
                    (<div className='event-options'>
                        <div className='edit-event' onClick={()=>{setEditModal(true)}}>
                            <img src="/assets/icons/edit.png" height={30} width={30}/>
                            Edit
                        </div>
                        <hr/>
                        <div className='delete-event' onClick={(()=>{deleteEvent()})}>

                            <img src="/assets/icons/delete.png" height={30} width={30}/>
                            Delete
                        </div>

                    </div>
                    )

                    }
                
                </div>
            </div>

            <div className='event-details-body-lower'>
                <div className='detail-body-div'>
                    <div className='body_heading'>
                        Details
                    </div> <div className='body-details'>
                        <span style={{display:"flex", gap:"0.5vmax",flexFlow:"row wrap" , alignItems:"center"}}> <img src="/assets/icons/people.png" height={20} width={20} /> {interested + going} people responded</span>
                        <span style={{display:"flex",gap:"0.5vmax", flexFlow:"row wrap" , alignItems:"center"}}><img src="/assets/icons/person.png" height={20} width={20}/>Event by {hostName}</span>
                        <span style={{display:"flex", gap:"0.5vmax", flexFlow:"row wrap" , alignItems:"center"}}> <img src="/assets/icons/location.png" width={20} height={20}/>{location}</span>
                        <span style={{display:"flex", gap:"0.5vmax",flexFlow:"row wrap" , alignItems:"center"}}>{invitationType === "public" && <img src='/assets/icons/public.png' height={20 } width={20}/>} {invitationType== "private" && <img src="/assets/icons/private.png" height={20} width={20}/>}{invitationType}</span>
                    </div>
                    <div style={{paddingLeft:"20px"}}>
                        <span>{description}</span>
                    </div>
                </div>
                
               

                <div className='body-details-right'>
                    <span>Tickets</span>
                    <button style={{padding:"0 5px 5px 5px", display:"flex", flexFlow:"row wrap", alignItems:"center", borderRadius:"0.4rem", border:"0.2px solid", justifyContent:"center"}} onClick={()=>{navigate(`/event-ticket/${id}`)}}>
                        <img src="/assets/icons/tickets.png" width={20} height={20}/>
                        Get tickets
                        </button>
                </div>

            </div>

        </div>
      
    </div>

    <EventpreviewModel open = {editModal} eventId = {id} onClose={()=>{setEditModal(false)}}/>
    <Bottombar/>
    </>
  )
}

export default Eventpreview
