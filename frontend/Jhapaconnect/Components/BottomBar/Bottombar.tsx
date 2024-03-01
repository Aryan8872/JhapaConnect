import { bottombarLinks } from '@/constants';
import {Link,useLocation, useNavigate} from 'react-router-dom';
import "./bottombar.css"

const Bottombar = () => {
  const {pathname}=useLocation();
  const navigate = useNavigate()
  const Logout = ()=>{
      localStorage.clear()
      navigate("/login")
      window.location.reload();
  }
  return (
    <section className='bottombar'>
       {bottombarLinks.map((link) => {
            const isActive =pathname === link.route   //return true or false if they match and not match
            console.log(isActive)   //checks if the current location of page is the route of specific page route if it matches it changes the style of that paricular link object
            return (

                <Link 
                  to={link.route}
                  key={link.label}
                  className="navlinks"  style={{backgroundColor:`${isActive && "red"} `}}>

                  <img src={link.imgURL}
                    alt={link.label}
                    className={`${isActive ? 'invert-white' : ''}`}                    
                    width={16}
                    height={16}
                  />

                <p className='linklabel'>{link.label}</p>
                </Link>


            )
          })}
    </section>
  )
}

export default Bottombar
