import React, { useEffect, useState } from 'react'
import "./pages-css/events.css"
import { Flame } from 'lucide-react'
import axios from 'axios';
import EventCard from '../../src/components/Eventcard/EventCard';
import { authToken } from './loginauth';
import Navbar from '@/components/navbar/Navbar';
import EventsLeftbar from '@/components/EventsLeftbar/EventsLeftbar';
import EventModal from '@/components/EventsLeftbar/EventModal';
import Bottombar from '@/components/BottomBar/Bottombar';


const Events = () => {

  const [EventData, SetEvent] = useState();
  const [eventcategories, setEventcategories] = useState();
  const [keyword, setKeyword] = useState();
  const [openModel, setOpenmodel] = useState(false);


  useEffect(() => {
    getEvent();
  }, [])

  const OpenModel = () => {
    setOpenmodel(true)
  }
  const closeModel = () => {
    setOpenmodel(false);

  }

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
