import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm} from "react-hook-form";
import './postuploader.css'
import { useMutation } from 'react-query';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { METHODS } from 'http';

const Postimageuploader = () => {

    const pid = useParams()


    const [postdata, setData] = useState(null);
    console.log(pid.postId)
    const id = pid.postId
  
    useEffect(() => {
      getPostdata(pid)
    }, [pid])

    

    type imageData= {
        image:any
    }

    const schema:ZodType<imageData> = z.object({
        image:z.any()
    })

    const {register , handleSubmit} = useForm<imageData>({resolver:zodResolver(schema)})


    const saveImage = useMutation({
        mutationKey:"SAVEIMAGE",
        mutationFn:(formData:FormData)=>{
            console.log(formData)
            return axios.post(`http://localhost:8080/api/v1/auth/post/image/upload/${id}`,formData)

        }
    })

    const processImage = async (data: imageData) => {
        // Create a new FormData object
        const formData = new FormData();
        // Append the image file to the FormData object
        formData.append('image', data.image[0]);
        saveImage.mutate(formData);
    
        try {
            // Perform the mutation using axios
            const response = await axios.post(`http://localhost:8080/api/v1/auth/post/image/upload/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Make sure to set the correct content type
                }
            });
            // Handle the response as needed
            console.log('Image upload successful:', response.data);
        } catch (error) {
            // Handle any errors that occur during the image upload
            console.error('Error uploading image:', error);
        }
    }	
  
    const getPostdata = async (pid) => {
      try {
        const dataRespone = await fetch(`http://localhost:8080/api/v1/auth/post/user/1/${id}`);
        console.log(dataRespone)
        if (!dataRespone.ok) {
          throw new Error("failed to load data")
        }
        const responseJSONdata = await dataRespone.json();
        // console.log(responseJSONdata)
        setData(responseJSONdata);
        console.log(postdata)
  
      }
      catch (error) {
        console.log(error)
      }
  
    }
  
  
  
    if (!postdata) {
      return <div>Loading...</div>;
    }
  
    const { addedDate, category, comments, description, imageName, location, tags, user } = postdata;
    const { firstName, lastName } = user;
  
  
    console.log(postdata)


  return (
    <div className='item-preview'>
      <div className='preview-container'>
        <div className='preview-image-container'>
         
            <form encType='multipart/form-data' onSubmit={handleSubmit(processImage)} method='post'>
            <section className='preview-image'>
            <input type='file' {...register("image")} name='image'/>
            </section>
            <button type='submit' >submit</button>

            </form>
        </div>

        <section className='right-detail'>
          <div className='right-upper-container' style={{ width: "100%" }}>
            <div className='post-head'>
              <Link to="/profile" style={{ textDecoration: "none", color: "black", display: "flex", gap: "0.3rem" }}>
                <img src="assets/icons/connect.png" height={32} width={32} />
                <span style={{ fontSize: "14px", display: "flex", flexFlow: "column wrap" }}>
                  {firstName} {lastName}
                  <span style={{ fontSize: "12px", color: "#737373" }}>
                    {/* <FontAwesomeIcon icon="fa-thin fa-location-dot" style={{color: "#0d0d0d",}} /> */}
                    {location}
                  </span>
                </span>
                <span>.</span>
                <span style={{ fontSize: "14px", color: "#737373" }}>{addedDate}</span>
              </Link>
            </div>

            <div className='post-details'>
              <div className='description-section'>
                {description}
              </div>

              <div className='tags'>
                {tags.length >= 1 ?
                  tags.map((tag, key) => (
                    <span style={{ color: "#00376B" }} key={key}>#{tag},</span>
                  )) : <span></span>}
              </div>

              <div className='right-lower'>
                <div className='like-section'>
                  <button className='post-interaction-btn' ><img src="/assets/icons/like.png" /></button>
                  <Link to="" className='post-interaction-btn'><img src="/assets/icons/comment.png" /></Link>
                </div>

                <section className='like-count'> 0 likes</section>
                <form className='post-preview-form'>
                  <input placeholder='Add comment' />
                  <button>Comment</button>
                </form>
              </div>
            </div>
            <hr />
          </div>

          <div className='post-cmts'>
            <div className='cmt-container'>
              <div className="user-photo">
                <img src='/assets/icons/connect.png' />
              </div>

              <div className='comment'>
                <span className='commenter'>Commentator</span>
                <div className='comment-text'>
                  kajwdkjawndkanwkdjjjjjjjjjjjjjjjjaaadnawdakwdjkwadjkakdw
                </div>
              </div>
            </div>

            {/* Add more comment containers here */}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Postimageuploader
