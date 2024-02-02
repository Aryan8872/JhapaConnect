import { bottombarLinks } from '@/constants';
import {Link,useLocation} from 'react-router-dom';

const Bottombar = () => {
  const {pathname}=useLocation();
  return (
    <section className='absolute z-50 flex justify-between items-center w-full  bottom-0 inset-x-0 rounded-t-[20px] bg-[#09090A] px-5 py-4 md:hidden'>
       {bottombarLinks.map((link) => {
            const isActive =pathname === link.route   //return true or false if they match and not match
            console.log(isActive)   //checks if the current location of page is the route of specific page route if it matches it changes the style of that paricular link object
            return (

                <Link
                  to={link.route}
                  key={link.label}
                  className={`${isActive && 'bg-[#877EFF] rounded-[10px]'} flex items-center justify-center flex-col gap-1 p-2 transition`}  >

                  <img src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                    width={16}
                    height={16}
                  />

                <p className='text-[10px] font-medium leading-[140%]'>{link.label}</p>
                </Link>


            )
          })}
    </section>
  )
}

export default Bottombar
