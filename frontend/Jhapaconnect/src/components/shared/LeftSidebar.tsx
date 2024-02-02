import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'
import React from 'react'
import { Link, NavLink, useNavigate,useLocation } from 'react-router-dom'
import { Button } from '../ui/button'

const LeftSidebar = () => {

  // pathname is the default var name that stores the current page route we need to use it
  const {pathname} = useLocation();   //it is used to identify the current route of the page so that css can be changed this hook return current location object

  return (
    <nav className='hidden md:flex px-6 py-10 flex-col justify-between min-w-[270px] border-r'>
      <div className='flex flex-col gap-11'>

        {/* logo photo link */}

        <Link to="/" className="flex gap-3 items-center" >
          <img src="/assets/images/logo.svg" width={170} height={36} />
        </Link>


     

        {/* navbar links */}


        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive =pathname === link.route   //return true or false if they match and not match
            console.log(isActive)   //checks if the current location of page is the route of specific page route if it matches it changes the style of that paricular link object
            return (
              <li key={link.label} className={`group rounded-lg base-medium hover:bg-[#877EFF] transition ${isActive && 'bg-[#877EFF]'}`}>

                <NavLink
                  to={link.route}
                  className='flex gap-4 items-center p-4  font-bold text-font-black'  >
                  <img src={link.imgURL}
                    alt={link.label}
                    className='text-font-black'
                  />

                  {link.label}

                </NavLink>

              </li>

            )
          })}
        </ul>
      </div>

        {/* logout btn */}
        <Button 
        variant="ghost" 
        className=' flex gap-4 items-center justify-start hover:bg-transparent hover:text-[#7878A3] !important' >

          <img src='/assets/icons/logout.svg' alt='logout'/>
          <p className='text-[14px] font-medium leading-[140%] lg:text-[16px] font-medium leading-[140%]'>Logout</p>
        </Button>

    </nav>
  )
}

export default LeftSidebar
