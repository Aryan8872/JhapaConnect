import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PostStats from './PostStats'

const PostCard = ({props}) => {


    const {caption, description,location , tags} = props; 
    console.log(location)  
    console.log(tags)
  return (
    <div className=' rounded-3xl border border-dark-4 p-5 lg:p-7 w-full max-w-screen-sm'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center gap-3'>
                <Link to={`/profile/`}>
                    <img 
                    src="/assets/icons/profile-placeholder.svg" 
                    className='rounded-full w-12 lg:h-12'
                    alt="creator" />
                </Link>

                <div className=' flex flex-col'>
                    <p className='text-[16px] font-medium leading-[140%] lg:text-[18px] font-bold leading-[140%] text-font-black'>ram prasad</p>
                    <div className='flex justify-center items-center gap-2 text-font-black'>
                        <p className=' text-[12px] font-semibold leading-[140%] lg:text-[14px] font-normal leading-[140%]'> post time</p>
                        -
                        <p className=' text-[12px] font-semibold leading-[140%] lg:text-[14px] font-normal leading-[140%]'>{location}</p>
                    </div>

                </div>

            </div>

            <Link to={`/update-post`}>
                <img src='/assets/icons/edit.svg' alt='edit' width={20} height={20}/>


            </Link>
        </div>
        <Link to={`/posts/`}>
            <div className='small-medium lg:base-medium py-5'>
                <p className=''> {caption}</p>
                <ul className='flex gap-1 mt-2'>
                    
                 {tags.length!=1 ? tags.map((tag,key)=>(
                    <span key={key}>#{tag} ,</span>
                 )):<span></span>}
                </ul>
            </div>

            <img 
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' 
            alt=''
            className='post-card_img'
            />
        </Link>
        <PostStats  />
      
    </div>
  )
}

export default PostCard
