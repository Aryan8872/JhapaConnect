import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { authToken } from '../../../root/pages/loginauth'
import { ZodType, z } from 'zod'
import "./editpost.css"

const EditPost = ({id, description,location, tags ,onClose, model}) => {

    console.log(model)
    if(model === false){
        return
    }

    const localStorageData = localStorage.getItem('data');

    const parsedData = JSON.parse(localStorageData);

    const userData = parsedData.data.user;
    const userId = userData.id;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;

    const [selectedImage, setSelectedImage] = useState(null);


    type PostData = {
        tags: string[] ,
        description: string,
        location: string,
      }
    
      const schema: ZodType<PostData> = z.object({
        tags: z.string().transform(value => value.split(',').map(tag => tag.trim())),
        description: z.string().min(4).max(400),
        location: z.string().min(4).max(60),
    
      })

    const { register, handleSubmit, formState } = useForm<PostData>({ resolver: zodResolver(schema) })

 

      const handleFileChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

 
    const handleUpdate = async (data: PostData) => {
        try {
            let responseImage; 
    
            if (selectedImage) {
                const formData = new FormData();
                formData.append('image', selectedImage);
    
                if (localStorage.getItem("jwtToken")) {
                    authToken(localStorage.getItem("jwtToken"));
                }
    
                responseImage = await axios.post(`http://localhost:8080/api/v1/auth/post/image/upload/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });
    
                data.imageName = responseImage.data.imageName;
            }
    
            if (localStorage.getItem("jwtToken")) {
                authToken(localStorage.getItem("jwtToken"));
            }
    
            const responsePostDetails = await axios.put(`http://localhost:8080/api/v1/auth/update/posts/${id}`, data);
    
            console.log('Image uploaded:', responseImage);
            console.log('Post details updated:', responsePostDetails);
    
            onClose();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };
    
    

  

  
  return (
    <div className='postoverlay' >
    <div className='postContainer'  >
        <div className='uppermodel'>
            <div className='topmodel'>
                <div className='edit-title'>
                    <img src="assets/icons/edit.png" height={30} width={30}/>
                    Edit Post      

                </div>
                <div className='close' onClick={onClose}>
                    x

                </div>

            </div>

      
        </div>
        <hr/>

        <div className='post_form-body'>
            <section className='post_username'>
                <div className='user_img'>
                    <img src=""  height={35} width={35} style={{borderRadius:"50%"}}/>
                </div>
                <section>
                    <span>{firstName} {lastName}</span>
                </section>

            </section>

            <form className='edit-post-form' onSubmit={handleSubmit(handleUpdate)} encType='multipart/form-data'>
                <section className='edit-form'>

                    <div className='location_div'>
                        <span>Location</span>
                        <input placeholder='Location' defaultValue={location} className='locationinput' {...register("location")} />

                    </div>

                    <div className='tags_div'>
                        <span>Tags</span>
                    <input placeholder='Tags' defaultValue={tags} className='tagsinput' {...register("tags")} />

                    </div>

                    <div className='description_div'>
                        <span>Description</span>
                    <textarea placeholder='Description' defaultValue={description} className='description-input' {...register("description")} />

                    </div>

                    <input type='file'  onChange={handleFileChange} accept='image/*'/>




                </section>

                <section className='submit_section'>
                    <button type='submit'>Save changes</button>
                </section>
            </form>


        </div>

    </div>

</div>
  )
}

export default EditPost
