import React from 'react'
import './share.css'
import { useForm } from 'react-hook-form'
import { ZodType, z } from 'zod'
import axios from 'axios'
import { useMutation } from 'react-query'
import { zodResolver } from '@hookform/resolvers/zod'

const Sharepost = () => {


  type PostData = {
    tags: string[],
    description: string,
    location: string | null,
    category: String,
  }

  const schema: ZodType<PostData> = z.object({
    tags: z.string().transform(value => value.split(',').map(tag => tag.trim())),
    caption: z.string().min(1).max(150),
    category: z.string(),
    location: z.string().nullable(),


  })

  const { register, handleSubmit, formState: { errors }, } = useForm<PostData>({ resolver: zodResolver(schema) })

  const savePost = useMutation({
    mutationKey: "SAVEPOST",
    mutationFn: (postData: PostData) => {
      return axios.post("http://localhost:8080/api/v1/auth/user/1/category/1/posts", postData)
    }

  }

  )

  const createpost = (data: PostData) => {
    savePost.mutate(data);
    console.log(data)

  }




  return (
    <div className="post-sharing">
      <div className="post-sharing-container">
        <form onSubmit={handleSubmit(createpost)}>
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
              <input type="file" id="file" style={{ display: "none" }} />
                <div className="post-sharing-item">
                  <img src="" alt="" />
                  <span>Add Image</span>
                </div>
              <div className="post-sharing-item">
                <img src="" alt="" />
                <input className='tags_input' placeholder='Add tags ' {...register("tags")}/>
              </div>

              <div className="post-sharing-item">
                <img src="" alt="" />
                <input className='tags_input' placeholder='Location ' {...register("location")}/>
              </div>

            </div>
            <div className="post-sharing-right">
              <button type='submit'>Share</button>
            </div>
          </div>
        </form>
      </div>

    </div>

  )
}

export default Sharepost
