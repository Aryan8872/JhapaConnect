import React from 'react'
import './pages-css/register.css'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

const Register = () => {
  return (
    <div className="register">
    <div className="register-card">
        <div className="register-left">
            <h1>Lama Social.</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                alias totam numquam ipsa exercitationem dignissimos, error nam,
                consequatur.
            </p>
            <span>Do you have an account?</span>
            <Link to="/Login">
                <button>Login</button>
            </Link>
        </div>
        <div className="register-right">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="Username" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <input type="text" placeholder="Name" />
                <button>Register</button>
            </form>
        </div>
    </div>
</div>


  )
}

export default Register
