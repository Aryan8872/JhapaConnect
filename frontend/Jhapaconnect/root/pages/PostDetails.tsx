import React from 'react'
import { Link } from 'react-router-dom'

const PostDetails = () => {
  return (
    <div className='post_details-container'>

      <div className='post_details-card'>
          <img 
            src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' 
            alt='post'
            className='post_details-img'
            />

        <div className='post_details-info'>
          <div className='flex justify-center items-center w-full'>
          <Link to={`/profile/`}>
            <img
              src="/assets/icons/profile-placeholder.svg"
              className='rounded-full w-12 lg:h-12'
              alt="creator" />

          <div className=' flex flex-col'>
            <p className='text-[16px] font-medium leading-[140%] lg:text-[18px] font-bold leading-[140%] text-font-black'>ram prasad</p>
            <div className='flex justify-center items-center gap-2 text-font-black'>
              <p className=' text-[12px] font-semibold leading-[140%] lg:text-[14px] font-normal leading-[140%]'> post time</p>
              -
              <p className=' text-[12px] font-semibold leading-[140%] lg:text-[14px] font-normal leading-[140%]'>post location</p>
            </div>

          </div>
          </Link>
          </div>
       


        </div>
      </div>

    </div>

  )
}

export default PostDetails
