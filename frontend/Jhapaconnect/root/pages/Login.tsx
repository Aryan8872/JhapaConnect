import React, { useState } from 'react'

import './pages-css/login.css'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import { useMutation } from 'react-query'
import { Schema, ZodType, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {doLoginVeify} from "./loginauth"
import { Bounce, toast } from 'react-toastify'
const Login = () => {

    const navigate = useNavigate(); 

    type LoginData ={
        email:string
        password:string
    }

    const schema : ZodType<LoginData> = z.object({
        email:z.string().email(),
        password:z.string()
    })

    const {register , handleSubmit ,formState} = useForm<LoginData>({resolver:zodResolver(schema)})

    const Login = useMutation({
        mutationKey:"LOGIN",
        mutationFn: async(data:LoginData)=>{
            await axios.post("http://localhost:8080/api/v1/auth/authenticate",data).then(
                (res)=>{
                    console.log(res.data.token)
                    localStorage.setItem("jwtToken",res.data.token)
                    doLoginVeify(res,()=>{
                        console.log("hello saved to local storage")
                        console.log(res.status)
                    })
                    res.status === 200 &&
                  
                    navigate("/")
                    window.location.reload();

                }
            )
            },onError:()=>{
                toast.error('🦄 Invalid details!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });        
            }

        }

    )

    const authenticate = (data:LoginData)=>{
        console.log(data)
        Login.mutate(data)

    }

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-left">
                    <div className='login-left-text'>
                    <h1>People Connect</h1>
                    <p>
                    Where Communities Thrive: People Connect, Your Digital Hub for Local Engagement!
                    </p>
                    <span>Don't you have an account?</span>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>

                    </div>
                  
                </div>
                <div className="login-right">
                    <div className='mobile-login-top'>
                        <img src="/assets/icons/connect.png" width={40} height={40}/>
                        <span>People connect</span>

                    </div>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(authenticate)}>
                        <input type="text" placeholder="Email" {...register("email")}/>
                        <input type="password" placeholder="Password"  {...register("password")}/>
                        <button type='submit'>Login</button>
                    </form>
                    <div className='mobile_bottom_login'>
                        <span>Dont have an account? <button onClick={()=>{navigate("/register")}}>Register</button></span>
                    </div>

                </div>
              
            </div>
         
        </div>


    )
}

export default Login
