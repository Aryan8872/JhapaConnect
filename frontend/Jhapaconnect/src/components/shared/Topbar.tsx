import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

const Topbar = () => {
  return (

    <section className='top-0 md:hidden sticky bg-[#09090A] w-full'>

      <div className='flex justify-between items-center py-4 px-5'>

      {/* logo btn */}
        <Link to="/" className="flex gap-3 items-center" >
            <img src="" width={30} height={25} />
        </Link>  

        <div className='flex gap-4'>

          {/*logout btn*/}
          <Button variant="ghost" className='' >
            <img src='/assets/icons/logout.svg' alt='logout'/>
          </Button>

          {/*profile btn */ }
          <Link to={'/profile/'} className='flex justify-center items-center gap-3'>

            <img src={ '/assets/images/profile-placeholder.svg'} className='h-8 w-8 rounded-full'/>


          </Link>
        </div>
      </div>
    </section>
  )
}

export default Topbar
