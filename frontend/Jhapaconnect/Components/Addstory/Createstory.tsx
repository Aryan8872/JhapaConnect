import React, { useState } from 'react'

import "./addstory.css"
import axios from 'axios'
import { ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authToken } from '../../root/pages/loginauth'
import { useMutation } from 'react-query'

const Createstory = ({ add, onClose }) => {

    if (!add) {
        return null
    }
    const [submitSucess, SetSubmitSucess] = useState(false);

    type storyData = {
        image:any
        content: string,
    }
    const schema: ZodType<storyData> = z.object({
        image:z.any(),
        content: z.string(),
      
    
    })

    const localStorageData = localStorage.getItem('data');

    const parsedData = JSON.parse(localStorageData);
  
    const userData = parsedData.data.user;
  
    const userId = userData.id;
    
    const { register, handleSubmit, formState } = useForm<storyData>({ resolver: zodResolver(schema) })
    
    
    const saveStory = useMutation({
        mutationKey: "UPDATEUSER",
        mutationFn: async (data: storyData) => {
            console.log(data)
            if(localStorage.getItem("jwtToken")){
                authToken(localStorage.getItem("jwtToken"))
                 await axios.post(`http://localhost:8080/api/v1/auth/story/${userId}/upload`, data).then(
                response => {
                    console.log(response.data)
                })
            }
        }
    })

    const processImage = async (data: storyData) => {
        const formData = new FormData();
        console.log(data)
        console.log(data.image)
        formData.append('image', data.image[0]);
        
        try {
            const response = await axios.post(`http://localhost:8080/api/v1/auth/story/${userId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Make sure to set the correct content type
                }
            });
            console.log('Image upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }	
    
  

    return (
        <div className='add-story_overlay'>
            <div className='add-story_container'>
                <div className='header'>
                    <span className='header_title'> Add story</span>

                    <div className='cancel' onClick={onClose}>
                        <img src="/assets/icons/back-button.png" />
                    </div>
                </div>

                <div className='image_uploader_section'>
                    <form encType='multipart/form-data' className='story_form' onSubmit={handleSubmit(processImage)}>
                        <div className='file_uploader'>

                            <input type='file'  className='image_input'  {...register("image")}  name='image'/>


                        </div>

                        <input type='text' placeholder='Write something...... (optional)' {...register("content")}/>
                        <div className='story-submit-container'>
                            <button className="story-submit-btn" type='submit'>Create story</button>
                        </div>

                    </form>

                </div>

            </div>

        </div>
    )
}

export default Createstory;
