import React, { useEffect, useState } from 'react'
import "./profile.css"
import ProfileModel from './ProfileModel'
import { authToken } from '../../../root/pages/loginauth';
import axios from 'axios'
import Profilepost from './Profilepost';
import { useNavigate, useParams } from 'react-router-dom';

const UserProfile = () => {
  const [userpost, setUserpost] = useState([]);
  const[user,setUser] = useState([])
  console.log(userpost)

  const id = useParams()
  const uid = id.Id

    const getUser = async()=>{
        if(localStorage.getItem("jwtToken")){
            authToken(localStorage.getItem("jwtToken"))
            await axios.get(`http://localhost:8080/api/v1/auth/${uid}/details`).then((res)=>{
                console.log(res.data)
                setUser(res.data)
            })
        }

    }
    useEffect(()=>{
        getUser();
    },[])
  const getUserposts = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      await axios.get(`http://localhost:8080/api/v1/auth/user/${uid}/posts`).then(
        (res) => {
          console.log(res)
          setUserpost(res.data)

        }
      )
    }

  }

  useEffect(()=>{
    getUserposts()
  },[])

  console.log(userpost)
  console.log(user)
  
  return (
    <>
      <div className="profile">
        <div className='profile-container'>
          <div className='upper_profile'>

            <div className='user-pic'>
              <div className='user-pic-container'>
                <img src='/assets/icons/connect.png' />
              </div>
            </div>

            <section className='user-det-section'>
              <div className='username-det'>
                <span>{user.firstName} {user.lastName}</span>
              </div>
              <div>
                <span style={{ fontSize: "14px" }}>{user.email}</span>
              </div>

            </section>

          </div>

          <div className='user-post-container'>

            {userpost.map((post,key)=>(
              <Profilepost key={key} imageName={post.imageName} postid={post.id}/>
            ))}
         

          </div>

        </div>
      </div>

    </>

  )
}

export default UserProfile
