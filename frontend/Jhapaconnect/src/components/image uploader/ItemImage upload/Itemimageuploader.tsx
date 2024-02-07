import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm} from "react-hook-form";
import './itemimage.css'
import { useMutation } from 'react-query';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';

const Itemimageuploader = () => {

    const pid = useParams()


    const [itemdata, setData] = useState(null);
    const [imagename,setImagename]= useState(null);
    const [ imageurl,setImageurl] = useState();
    const [isLoading, setIsLoading] = useState(true);
    console.log(pid.itemId)
    const id = pid.itemId
  
    useEffect(() => {
      getItemdata(pid)
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
            return axios.post(`http://localhost:8080/api/v1/auth/item/image/upload/${id}`,formData).then(
                response =>{
                    setImagename(response.data.imageName)
                    console.log(response)
                  }
                ).catch(err => console.log(err))

        }
    })

    const processImage = async (data: imageData) => {
        // Create a new FormData object
        const formData = new FormData();
        // Append the image file to the FormData object
        formData.append('image', data.image[0]);
        saveImage.mutate(formData);
    
 
    }	
  
    const getItemdata = async (pid) => {
      try {
        const dataRespone = await fetch(`http://localhost:8080/api/v1/auth/item/user/1/${id}`);
        console.log(dataRespone)
        if (!dataRespone.ok) {
          throw new Error("failed to load data")
        }
        const responseJSONdata = await dataRespone.json();
        // console.log(responseJSONdata)
        setData(responseJSONdata);
        console.log(itemdata)
  
      }
      catch (error) {
        console.log(error)
      }
  
    }

    const getPostimage= async ()=>{
        try {
            const response = await axios.get(`http://localhost:8080/api/v1/auth/post/image/${imagename}`, {
                responseType: 'blob' 
            });

            const imageUrl = URL.createObjectURL(response.data);

            setImageurl(imageUrl);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    }

  useEffect(()=>{
    getPostimage()

  },[imageurl,imagename])


  
  
  
    if (!itemdata) {
      return <div>Loading...</div>;
    }
  
    const { addedDate, category, description, imageName, location, user } = itemdata;
    const { firstName, lastName } = user;
  
  
    console.log(itemdata)


  return (
    <div className='item-preview'>
      <div className='preview-container'>
        <div className='preview-image-container'>

            {imageurl? <img src={imageurl}/> : (<form encType='multipart/form-data' onSubmit={handleSubmit(processImage)} method='post'>
            <section className='preview-image'>
            <input type='file' {...register("image")} name='image'/>
            </section>
            <button type='submit' >submit</button>

            </form>)}

          
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

export default Itemimageuploader;
