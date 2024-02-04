import { useForm } from "react-hook-form";
import {ZodType, z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { Mutation, useMutation } from "react-query";
import axios from "axios";
import { List } from "postcss/lib/list";
import { userInfo } from "os";


const PostForm = () => {

    type PostData = {
      tags:string[],
      description:string,
      location:string | null,
      category:String,
    }

    const schema : ZodType<PostData>=z.object({
      tags: z.string().transform(value => value.split(',').map(tag => tag.trim())),       
      caption:z.string().min(1).max(150),
      category:z.string(),
      location:z.string().nullable(),


    })

  const {register, handleSubmit , formState:{errors},} = useForm <PostData>({resolver:zodResolver(schema)})

  const savePost = useMutation({
    mutationKey:"SAVEPOST",
    mutationFn:(postData:PostData)=>{
      return  axios.post("http://localhost:8080/post/newPost", postData)
    }

  }

  )
   
  const createpost = (data:PostData)=>{
    savePost.mutate(data);
    console.log(data)
    
  }


  return (
    <div className='flex flex-col gap-4 pt-7 lg:items-center'>
      <form 
      className='flex flex-col gap-4 lg:w-[70%] md:w-[95%]' 
       onSubmit={handleSubmit(createpost)}>

      <div className='flex flex-col gap-4 w-[100%]'>

      <label className='hidden md:flex'>Caption</label>
      <input 
      className='lg: h-[40px]  rounded-md text-[#000000]   md: w-[95%] h-[40px] placeholder:text-[14px]'
       placeholder='Add your caption or title'
       {...register("caption")}
       />

      {errors.caption && <span>{errors.caption.message}</span>}

      </div>

      <div className='flex flex-col gap-4  w-[100%]'>
        <label className='hidden md:flex'>Description</label>

        <input type="text" 
        placeholder=" Add your description" 
        className='rounded-md h-[150px] overflow-auto text-[#000000] md: h-[100px] w-[95%]  placeholder:text-[14px]' 
        {...register("description")} />

      </div>

      <div className='flex flex-col gap-4 w-[100%]'>
        <label className='hidden md:flex'>Location</label>
        <input 
        className="rounded-md h-[50px] text-[#000000] md: h-[40px] w-[95%] placeholder:text-[14px]" 
        placeholder='Add your location (optional)'
        {...register("location")} />

      </div>

      <div className='flex flex-col gap-4 w-[100%]'>
        <label className='hidden md:flex'>Tags</label>

        <input 
        className="rounded-md h-[50px] text-[#000000] md: h-[40px] w-[95%] placeholder:text-[14px]" 
        placeholder='Add your tags in format (#Anime,#News,#Music,etc)' 
        {...register("tags")}
        />

      {errors.tags && <span>{errors.tags.message}</span>}


      </div>

      <div>
        <button type="submit">Post</button>
      </div>

      </form>

     
      
    </div>
  )
}

export default PostForm
