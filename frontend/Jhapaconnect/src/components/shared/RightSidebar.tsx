import React from 'react'

import { Link } from 'react-router-dom';

const RightSidebar = () => {
  return (
    <>
      <div className='hidden md:flex w-[270px]'>
        <div className='text-font-black  hidden md:flex h-[90px]' >
          {/* profile photo link */}

          <Link to={'/profile/'} className='flex gap-3 items-center text-[#7878A3] h-[70px]'>
            <img src={'/assets/icons/profile-placeholder.svg'}
              alt='profile'
              className='h-14 w-14 rounder-full'
            />

            {/* user name */}
            <div className='flex flex-col text-[#7878A3]'>
              <p className='text-[18px] text-font-black font-semibold leading-[140%] '>
                hari bahadur
              </p>

              <p className='text-[14px] font-normal leading-[140%] text-[#7878A3]'>
                @hari
              </p>


            </div>

          </Link>

        </div>

      </div>
    </>


  )
}

export default RightSidebar
