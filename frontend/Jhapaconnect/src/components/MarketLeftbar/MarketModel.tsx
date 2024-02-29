import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authToken } from '../../../root/pages/loginauth';
import { ZodType, z } from 'zod';
import "./marketmodal.css"
import { Bounce, toast } from 'react-toastify';

const MarketModel = ({ open, onClose, categories }) => {

    if (!open) {
        return null
    }

    const localStorageData = localStorage.getItem('data');

    // Step 2: Parse the JSON string into a JavaScript object   
    const parsedData = JSON.parse(localStorageData);

    // Step 3: Extract the user data from the parsed object
    const userData = parsedData.data.user;

    // Now you can access individual properties of the user data
    const userId = userData.id;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;



    const [itemId, setItemid] = useState(null);
    const [formsubmit, setFormsubmit] = useState(false);
    const [catId,setCatid] = useState();
    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);



    const setCategoryid = (id)=>{
        setCatid(id)
    }

    type itemData = {
        title: string,
        price: number,
        description: string,
        location: string,
    }
    const schema: ZodType<itemData> = z.object({
        title: z.string(),
        price: z.string(),
        description: z.string(),
        location: z.string(),

    })

    const { register, handleSubmit, formState:{errors} } = useForm<itemData>({ resolver: zodResolver(schema) })



    const saveItem = useMutation({
        mutationKey: 'SAVEDATA',
        mutationFn: async (requestData: itemData) => {
          try {
          
            const response = await axios.post(`http://localhost:8080/api/v1/auth/user/${userId}/category/${catId}/item`, requestData);
            return response.data.id;
          } catch (error) {
            toast.error('🦄 Error creating Item try again!', {
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
        onSuccess: async (itemId) => {
          try {
            if (selectedImage) {
              const formData = new FormData();
              formData.append('image', selectedImage);
    
              const responseImage = await axios.post(`http://localhost:8080/api/v1/auth/item/image/upload/${itemId}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
    
              console.log('Image uploaded:', responseImage);
            }
            toast.success('🦄 Item created sucessfully!', {
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
              window.location.reload()
          } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Selecy your image');
    
          }
        },
      });

      const createItem = (data: itemData) => {
        if (!catId || !data.description || !data.location || !data.price || !data.title) {
          toast.error('✅ Please fill all the fields!', {
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
        }
        else if (data.price !== null && isNaN(parseInt(data.price))) {
          toast.error('Invalid price', {
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
      
      
        else {
          saveItem.mutate(data);
        }
      }
      
      
  const handleFileChange = (event) => {
   
      setSelectedImage(event.target.files[0]);
  };

  

  
    return (
        <div className='marketoverlay' >
            <div className='marketmodelContainer'  >
                <div className='upper'>
                    <div className='top'>

                        List item
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
                            <span>{firstName} {lastName}</span>
                        </section>

                    </section>

                    <form className='market-form' onSubmit={handleSubmit(createItem)} encType='multipart/form-data'>
                        <section className='forms'>
                            <input placeholder='Event name' className='event_input' {...register("title")} />

                            <section className='datesection'>
                                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                                    <span>Category</span>
                                    <select onChange={(event) => setCategoryid(event.target.value)}>
                                        <option value={null} >Select a category</option>
                                        {categories.map((cat, key) => (
                                            <option key={key} value={cat.categoryId}>{cat.categoryTitle}</option>
                                        ))}
                                    </select>


                                </div>

                                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                                    <span>Price</span>
                                    <input placeholder='Price' style={{ width: "100%" }} {...register("price")} />
                                 
                                      
    
                                </div>
                            </section>

                            <textarea placeholder='Description' className='description_input' {...register("description")} >
                            </textarea>

                            <input placeholder='Location' className='location-input' {...register("location")} />

                            <input type='file'  onChange={handleFileChange} accept='image/*'/>




                        </section>

                        <section className='button_section'>
                            <button type='submit'>Add item</button>
                        </section>
                    </form>


                </div>

            </div>

        </div>
    )
}

export default MarketModel
