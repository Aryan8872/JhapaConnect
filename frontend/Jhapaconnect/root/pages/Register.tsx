import React from 'react'
import './pages-css/register.css'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ZodType, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMutation } from 'react-query';
import { Bounce, toast } from 'react-toastify';
import { error } from 'console';

const Register = () => {
    const navigate = useNavigate();
    type FormData = {
        firstName:string;
        lastName:string;
        email:string;
        phoneNo:string;
        password:string;
    }

    const schema:ZodType<FormData> = z.object({
        firstName:z.string().min(3,{message:"Firstname is not suitable"}),
        lastName:z.string().min(4,{message:"Lastname is not valid"}),
        email:z.string().email({message:"Invalid email address"}),
        phoneNo:z.string().min(10),
        password:z.string().min(5,{message:"Password must be more than 5 characters"}).max(20)
    })

    const {register , handleSubmit , formState:{errors}}= useForm <FormData>({resolver:zodResolver(schema)});

    const saveData =useMutation({
        mutationKey:"SAVEDATA",
        mutationFn:(requestData:FormData)=>{
            return  axios.post("http://localhost:8080/api/v1/auth/register", requestData)
        },onSuccess: ()=>{
            toast.success(' ✅ Sucessfully registered!', {
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
                navigate("/login")
        },onError: ()=>{
            toast.error(' ❌ Failed to register!', {
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
    })



    const createUser=(data:FormData)=>{
        saveData.mutate(data);
        console.log(data);
    }

  return (
    <div className="register">
    <div className="register-card">
        <div className="register-left">
            <div className='register-left-text'>
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
         
        </div>
        <div className="register-right">
            <h1>Register</h1>
            <form onSubmit={handleSubmit(createUser)}>
                <input type="text" placeholder="Firstname" {...register("firstName")}/>
                {errors.firstName &&   
                toast.error(errors.firstName.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                }) }
                <input type="text" placeholder="Lastname" {...register("lastName")} />
                {
                    errors.lastName && 
                    toast.error(errors.lastName.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        })
                }
                <input type="email" placeholder="Email" {...register("email")} />
                {
                    errors.email &&
                    toast.error(errors.email.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        })
                }
                <input type="text" placeholder="Phone no" {...register("phoneNo")} />
                {
                    errors.phoneNo &&
                    toast.error(errors.phoneNo.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        })
                }
                <input type="password" placeholder="Password" {...register("password")} />
                {
                    errors.password && 
                    toast.error(errors.password.message, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        transition: Bounce,
                        })
                }
              
                <button type={'submit'}>Register</button>
            </form>

            <div className='mobile_bottom_register'>
                <span>Already have an account ?<button onClick={()=>{navigate("/login")}}>Login</button></span>

            </div>
        </div>
    </div>
</div>


  )
}

export default Register
