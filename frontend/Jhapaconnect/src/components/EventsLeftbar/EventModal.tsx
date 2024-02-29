import React, { useEffect, useState } from 'react'
import './Modal.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from 'react-query';
import { Bounce, toast } from 'react-toastify';
import {format} from "date-fns"
import moment from "moment"

const EventModal = ({ open, onClose,categories }) => {

  if(!open) return null

  const localStorageData = localStorage.getItem('data');
  const parsedData = JSON.parse(localStorageData);
  const userData = parsedData.data.user;

  const userId = userData.id;
  const firstName = userData.firstName;
  const lastName = userData.lastName;

  const [categoryId , setCategoryid] = useState()
  const [selectedImage, setSelectedImage] = useState(null);




  type EventData = {
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    location: string,
    hostName:string
    invitationType:string

  }

  const schema: ZodType<EventData> = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    location: z.string(),
    hostName:z.string(),
    invitationType:z.string()

  })



  const { register, handleSubmit ,formState:{errors} } = useForm<EventData>({ resolver: zodResolver(schema) })


  const saveEvent = useMutation({
    mutationKey: 'SAVEDATA',
    mutationFn: async (requestData: EventData) => {
      try {
        
        const response = await axios.post(`http://localhost:8080/api/v1/auth/user/${userId}/category/${categoryId}/event`, requestData);
     
        return response.data.id;
      } catch (error) {
        toast.error('🦄 Error creating Event try again!', {
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
          throw error;
      }
    },
    onSuccess: async (eventId) => {
      try {
        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);

          const responseImage = await axios.post(`http://localhost:8080/api/v1/auth/event/image/upload/${eventId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Image uploaded:', responseImage);
        }
        toast.success('🦄 Event created sucessfully!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
       
      } catch (error) {
        console.error('Error uploading image:', error);
        toast.error('Error sharing post. Please try again later.');

      }
    },
  });

  const createEvent = (data:EventData)=>{
   
    if (!categoryId || !data.description || !data.location || !data.title || !data.hostName || !data.invitationType) {
      toast.error(' Please fill all the fields!', {
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
    else if (!selectedImage) {
      toast.error('Please select an image', {
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
    }else{
      data.startDate = data.startDate.toISOString(); 
      data.endDate = data.endDate.toISOString(); 
      saveEvent.mutate(data);
      console.log(data)

    }
    
  }
  
const handleFileChange = (event) => {
  setSelectedImage(event.target.files[0]);
};





  return (
    <div className='overlay' >
      <div className='modelContainer'  >
        <div className='upper'>
          <div className='top'>

            Create Event
            <div className='back' onClick={onClose}>
              x

            </div>

          </div>

          {/* <div>
              <img src=''/>
            </div> */}
        </div>

        <div className='form-body'>
          <section className='username'>
            <div>
              <img src="" />
            </div>
            <section>
              <span>hari shrestha</span>
            </section>

          </section>

          <form className='event-form' onSubmit={handleSubmit(createEvent)} noValidate>
            <section className='forms'>
              <input placeholder='Event name' className='event_input' {...register("title",{
                
              } )} />

              <section className='datesection'>
                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                  <span>Start Date</span>
                  <input type='date' style={{ width: "100%" }} {...register("startDate",{valueAsDate:true})}  />

                </div>

                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                  <span>Start Date</span>
                  <input type='date' style={{ width: "100%" }} {...register("endDate",{valueAsDate:true})} />

                </div>
              </section>

              <section className='selectsection'>
                <select onChange={(event) => setCategoryid(event.target.value)}>
                <option value={null}>Select a category</option>

                                        {categories.map((cat, key) => (
                                            <option key={key} value={cat.categoryId}>{cat.categoryTitle}</option>
                                        ))}
                </select>

                <input placeholder='Location' className='location-input' {...register("location")} />


              </section>

              <section className='hostname_section'>

                <input placeholder='Hostname' className='hostnameinput' {...register("hostName")} />

                <input placeholder='Invitation type' className='invitype' {...register("invitationType")} />

              </section>

              <input placeholder='Description' className='description_input' {...register("description")} />


              <input type='file'  onChange={handleFileChange} accept='image/*'/>






            </section>


            <section className='button_section'>
              <button type='submit'>Create event</button>
            </section>
          </form>


        </div>

      </div>

    </div>
  )
}

export default EventModal
