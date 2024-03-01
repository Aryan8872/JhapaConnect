import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLeft = () => {
    const navigate = useNavigate()
    const Logout = ()=>{
        localStorage.clear()
        navigate("/login")
        window.location.reload();
    }
  return (
    <div className="left-bar">
    <div className="left-bar-container">
        <div>
            <span>Admin</span>
        </div>
              <div className="left-bar-menu">
                 <span>Your shortcuts</span>
           

            <div className="left-bar-item" onClick={()=>{Logout()}}>
                <img src="/assets/icons/logout.png" alt="events icon" />
                <span>Logout</span>
            </div>


        </div>
        <hr />

    </div>
</div>
  )
}

export default AdminLeft
