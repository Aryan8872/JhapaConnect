import React, { useEffect, useState } from 'react'
import './share.css'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import axios from 'axios'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate} from 'react-router-dom'


const Sharepost = () => {


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

  const { register, handleSubmit, formState } = useForm<PostData>({ resolver: zodResolver(schema) });
  const [postid, setPostid] = useState(null);
  const [formSubmit,setFormsubmit] = useState(false)
  const navigate  = useNavigate();



  const savePost = useMutation({
    mutationKey: "SAVEDATA",
    mutationFn:(requestData: PostData) => {
      return  axios.post("http://localhost:8080/api/v1/auth/user/1/category/1/posts", requestData).then(
        response =>{
          setPostid(response.data.id)
          setFormsubmit(true)
          console.log(postid)
          console.log(response)

        }
      ).catch(err => console.log(err))
    }
  })



  useEffect(() => {
    if (formSubmit && postid) {
      navigate(`/post/${postid}/image/upload`);
    }
  }, [formSubmit, postid, navigate]);





  const createPost =(data: PostData) => {
    savePost.mutate(data);


  }



    return (
      <div className="post-sharing">
        <div className="post-sharing-container">
          <form onSubmit={handleSubmit(createPost)}  action={`/post/${postid}`}  encType='multipart/form-data' >
            <div className="post-sharing-top">
              <img
                src=""
                alt="profilepic"
              />
              <input type="text" placeholder={`What's on your mind aryan`} {...register("description")} />
            </div>
            <hr />
            <div className="post-sharing-bottom">
              <div className="post-sharing-left">
                {/* {fileInputVisible && (
              <input type="file" id="file" {...register("image")} name='image'/>
              )} */}
                <div className="post-sharing-item">
                  <img src="" alt="" />
                  <span>Add Image</span>
                </div>
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
                  <input type={'submit'} value={"share"} />
              </div>
            </div>
          </form>
        </div>

      </div>

    )
  
}

  export default Sharepost;
