import React, { useEffect, useState } from 'react'
import "./profile.css"
import ProfileModel from './ProfileModel'
import { authToken } from '../../../root/pages/loginauth';
import axios from 'axios'
import Profilepost from './Profilepost';

const Profile = () => {
  const [loadModel, setLoadModel] = useState(false)
  const [userpost, setUserpost] = useState([]);

  const open = () => {
    setLoadModel(true)
  }
  console.log(userpost)


  const localStorageData = localStorage.getItem('data');

  const parsedData = JSON.parse(localStorageData);

  const userData = parsedData.data.user;

  const userId = userData.id;
  const firstName = userData.firstName;
  const lastName = userData.lastName;
  const email = userData.email;
  const phoneNo = userData.phoneNo;

  console.log(userId)

  const getUserposts = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      await axios.get(`http://localhost:8080/api/v1/auth/user/${userId}/posts`).then(
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
                <span>{firstName} {lastName}</span>
                <button onClick={() => { open() }}>Edit profile</button>
              </div>

              <div>
                <span style={{ fontSize: "14px" }}>{email}</span>
              </div>

            </section>

          </div>

          <div className='user-post-container'>

            {userpost.map((post,key)=>(
              <Profilepost key={key} imageName={post.imageName}/>
            ))}
         

          </div>

        </div>
      </div>

      <ProfileModel open={loadModel} onClose={() => { setLoadModel(false) }} />

    </>

  )
}

export default Profile
