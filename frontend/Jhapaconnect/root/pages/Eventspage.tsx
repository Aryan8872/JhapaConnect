import React, { useEffect, useState } from 'react'
import "./pages-css/events.css"
import { Flame } from 'lucide-react'
import axios from 'axios';
import EventCard from '../../Components/Eventcard/EventCard';
import { authToken } from './loginauth';
import Navbar from '../../Components/navbar/Navbar';
import EventsLeftbar from '../../Components/EventsLeftbar/EventsLeftbar';
import EventModal from '../../Components/EventsLeftbar/EventModal';
import Bottombar from '../../Components/BottomBar/Bottombar';
import { useNavigate } from 'react-router-dom';


const Events = () => {

  const [EventData, SetEvent] = useState();
  const [eventcategories, setEventcategories] = useState();
  const [keyword, setKeyword] = useState();
  const [openModel, setOpenmodel] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenExpiration()
    getEvent();
  }, [])

  const OpenModel = () => {
    setOpenmodel(true)
  }
  const closeModel = () => {
    setOpenmodel(false);

  }

  
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
            // Token is expired, redirect to the login page
            navigate('/Login') 
            // Change '/login' to your login page URL
            localStorage.clear()

        }
    } else {
        // Token not found, redirect to the login page
        navigate('/Login') 
        localStorage.clear()
      
    }
};

  const getEvent = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get("http://localhost:8080/api/v1/auth/events").then((res) => {
        SetEvent(res.data)
        console.log(res.data)
      })
    }

  }
  const getEventCategory = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get("http://localhost:8080/api/v1/auth/eventcategories/").then((res) => {
        setEventcategories(res.data)
        console.log(res.data)

      })
    }
  }

  const searchEventbycategory = async (keyword) => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get(`http://localhost:8080/api/v1/auth/category/${keyword}/events`).then((res) => {
        SetEvent(res.data)
        console.log(res.data)
      })
    }
  }



  const searchEvents = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      if (keyword != null) {
        const data = await axios.get(`http://localhost:8080/api/v1/auth/events/search/${keyword}`).then((res) => {
          SetEvent(res.data);
        }
        )
      }
    }
  }
  const Search = (event) => {
    setKeyword(event?.target.value)
    console.log(event.target.value)
  }

  if (!EventData) {
    return <div>Loading....</div>
  }
  return (

    <>
      <Navbar />

      <div className='events'>
        <EventsLeftbar categories={eventcategories} handleSearch={Search} searchBycat={searchEventbycategory} searchEvents={searchEvents} getCategories={getEventCategory} OpenModal={OpenModel} getAll={getEvent} />


        <div className='events-container'>
          {EventData.map((data, key)=>(
            <EventCard key={key} props={data}/>
          ))}




        </div>


      </div>

      <EventModal categories={eventcategories} open={openModel} onClose={() => setOpenmodel(false)} />

      <Bottombar/>


    </>


  )
}

export default Events
