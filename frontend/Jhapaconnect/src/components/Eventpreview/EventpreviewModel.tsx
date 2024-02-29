import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { authToken } from '../../../root/pages/loginauth';
import { ZodType, z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';

const EventpreviewModel = ({ open, onClose, eventId }) => {
  if (!open) {
    return null
  }
  const [formSucess, SetFormSucess] = useState(false);
  const [Eventid, SetEventId] = useState();
  const [categoryId, setCategoryid] = useState()
  const [eventdata, setEventdata] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null);

  const navigate = useNavigate();

  type EventData = {
    title: string,
    description: string,
    startDate: Date,
    endDate: Date,
    location: string,
    hostName: string
    invitationType: string

  }

  const schema: ZodType<EventData> = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    location: z.string(),
    hostName: z.string(),
    invitationType: z.string()

  })

  const { register, handleSubmit, formState: { errors } } = useForm<EventData>({ resolver: zodResolver(schema) })


  const getEvent = async () => {
    await axios.get(`http://localhost:8080/api/v1/auth/event/${eventId}`).then((res) => {
      setEventdata(res.data)
      console.log(res.data)
    })

  }
  useEffect(() => {
    getEvent()
  }, [])

  const getCategories = async () => {
    await axios.get("http://localhost:8080/api/v1/auth/eventcategories/").then((res) => {
      setCategories(res.data)

    })
  }
  useEffect(() => {
    getCategories()
  }, [])
  const saveEvent = useMutation({
    mutationKey: "UPDATEEVENT",
    mutationFn: async (data: EventData) => {
      if (localStorage.getItem("jwtToken")) {
        authToken(localStorage.getItem("jwtToken"))
        await axios.put(`http://localhost:8080/api/v1/auth/update-event/${eventId}`, data).then((res) => {
          SetEventId(res.data.id)
          SetFormSucess(true)
        }
        )

      }

    }
  }

  )
  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };



  const handleUpdate = async (data: EventData) => {
    console.log(data.title)

    if (!selectedImage) {
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
    try {
      let responseImage;

      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);

        if (localStorage.getItem("jwtToken")) {
          authToken(localStorage.getItem("jwtToken"));
        }

        responseImage = await axios.post(`http://localhost:8080/api/v1/auth/event/image/upload/${eventId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        data.imageName = responseImage.data.imageName;
      }

      if (localStorage.getItem("jwtToken")) {
        authToken(localStorage.getItem("jwtToken"));
      }

      const responsePostDetails = await axios.put(`http://localhost:8080/api/v1/auth/update-event/${eventId}`, data);

      console.log('Image uploaded:', responseImage);
      console.log('Post details updated:', responsePostDetails);

      onClose();
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
  };






  useEffect(() => {
    if (Eventid && formSucess) {
      onClose
    }

  }, [Eventid, formSucess, navigate])



  return (
    <div className='overlay' >
      <div className='modelContainer'  >
        <div className='upper'>
          <div className='top'>

            Edit Event
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

          <form className='event-form' onSubmit={handleSubmit(handleUpdate)}>
            <section className='forms'>
              <input placeholder='Event name' defaultValue={eventdata.title} className='event_input' {...register("title")} />

              <section className='datesection'>
                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                  <span>Start Date</span>
                  <input type='date' style={{ width: "100%" }} {...register("startDate")} />
                  {errors.startDate && <p>{errors.startDate.message}</p>}

                </div>

                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                  <span>End Date</span>
                  <input type='date' style={{ width: "100%" }} {...register("endDate")} />
                  {errors.endDate && <p>{errors.endDate.message}</p>} {/* Display email validation error */}

                </div>
              </section>

              <section className='selectsection'>
                <select onChange={(event) => setCategoryid(event.target.value)}>
                  <option value={null} defaultValue={eventdata.category}>Select a category</option>

                  {categories.map((cat, key) => (
                    <option key={key} value={cat.categoryId}>{cat.categoryTitle}</option>
                  ))}
                </select>

                <input placeholder='Location' defaultValue={eventdata.location} className='location-input' {...register("location")} />


              </section>

              <section className='hostname_section'>

                <input placeholder='Hostname' defaultValue={eventdata.hostName} className='hostnameinput' {...register("hostName")} />

                <input placeholder='Invitation type' defaultValue={eventdata.invitationType} className='invitype' {...register("invitationType")} />

              </section>

              <input placeholder='Description' defaultValue={eventdata.description} className='description_input' {...register("description")} />

              <input type='file' onChange={handleFileChange} accept='image/*' />


            </section>


            <section className='button_section'>
              <button type='submit'>Save event</button>
            </section>
          </form>


        </div>

      </div>

    </div>
  )
}

export default EventpreviewModel
