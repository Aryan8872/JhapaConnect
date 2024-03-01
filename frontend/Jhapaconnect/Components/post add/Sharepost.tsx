import React, { useEffect, useState } from 'react'
import './share.css'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import axios from 'axios'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate} from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';


const Sharepost = () => {

  const localStorageData = localStorage.getItem('data');
  const parsedData = JSON.parse(localStorageData);
  const userData = parsedData.data.user;
  const userId = userData.id;

  type PostData = {
    tags: string[];
    description: string;
    location: string;
  };

  const schema: ZodType<PostData> = z.object({
    tags: z.string().transform(value => value.split(',').map(tag => tag.trim())),
    description: z.string().min(4).max(400),
    location: z.string().min(4).max(60),
  });

  const { register, handleSubmit } = useForm<PostData>({ resolver: zodResolver(schema) });
  const [selectedImage, setSelectedImage] = useState(null);

  const savePost = useMutation({
    mutationKey: 'SAVEDATA',
    mutationFn: async (requestData: PostData) => {
      console.log(requestData)
      console.log(requestData.tags)
      try {
        
        const response = await axios.post(`http://localhost:8080/api/v1/auth/user/${userId}/createpost`, requestData);
        return response.data.id;
      } catch (error) {
        toast.error('🦄 Error creating post try again!', {
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
    onSuccess: async (postId) => {
      try {
        if (selectedImage) {
          const formData = new FormData();
          formData.append('image', selectedImage);

          const responseImage = await axios.post(`http://localhost:8080/api/v1/auth/post/image/upload/${postId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Image uploaded:', responseImage);
        }
        window.location.reload()
        toast.success('🦄 Post created sucessfully!', {
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

  const createPost = (data: PostData) => {
    console.log(data)
    if (!data.tags || !data.description || !data.location) {
      toast.error('🦄 Please fill all the fields', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    savePost.mutate(data);
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };
 




    return (
      <div className="post-sharing">
        <div className="post-sharing-container">
          <form onSubmit={handleSubmit(createPost)}    encType='multipart/form-data' >
            <div className="post-sharing-top">
              <img
                src="/assets/icons/connect.png"
                alt="profilepic"
              />
              <input type="text" placeholder={`What's on your mind aryan`} {...register("description")} />
            </div>
            <hr />
            <div className="post-sharing-bottom">
              <div className="post-sharing-left">
            
                <div className="post-sharing-item">
                  <img src="" alt="" />
                  <input className='tags_input' placeholder='Add tags ' {...register("tags")} />
                </div>

                <div className="post-sharing-item">
                  <img src="" alt="" />
                  <input className='tags_input' placeholder='Location ' {...register("location")} />
                </div>

              </div>
              <div className="post-sharing-right">
              <input type="file" onChange={handleFileChange} accept="image/*" />

                  <input type={'submit'} value={"share"} />
              </div>
            </div>
          </form>
        </div>

      </div>

    )
  
}

  export default Sharepost;
