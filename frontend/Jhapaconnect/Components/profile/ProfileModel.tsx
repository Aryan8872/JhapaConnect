import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authToken } from '../../root/pages/loginauth';
import { ZodType, z } from 'zod';
import "./profilemodel.css"
import axios from 'axios';

const ProfileModel = ({open,onClose}) => {
    if (!open) {
        return null
    }

    const localStorageData = localStorage.getItem('data');

    // Step 2: Parse the JSON string into a JavaScript object   
    const parsedData = JSON.parse(localStorageData);

    // Step 3: Extract the user data from the parsed object
    const userData = parsedData.data.user;

    // Now you can access individual properties of the user data
    const userId = userData.id;
    const firstName = userData.firstName;
    const lastName = userData.lastName;
    const email = userData.email;
    const phoneNo = userData.phoneNo;



    const [formsubmit, setFormsubmit] = useState(false);

    type userData = {
        firstName: string,
        lastName: string,
        email: string,
        phoneNo:string,
        password: string,
    }
    const schema: ZodType<userData> = z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phoneNo: z.string(),
        password: z.string()

    })

    const { register, handleSubmit, formState } = useForm<userData>({ resolver: zodResolver(schema) })


    const saveItem = useMutation({
        mutationKey: "UPDATEUSER",
        mutationFn: async (data: userData) => {
            if(localStorage.getItem("jwtToken")){
                authToken(localStorage.getItem("jwtToken"))
                 await axios.post(`http://localhost:8080/api/v1/auth/user/${userId}/update`, data).then(
                response => {
                    console.log(response.data)
                    setFormsubmit(true)
                    
                    const localStorageData = localStorage.getItem('data');
                    if (localStorageData) {
                const parsedData = JSON.parse(localStorageData);
                parsedData.data.user.email = response.data.email;
                parsedData.data.user.firstName = response.data.firstName;
                const updatedDataString = JSON.stringify(parsedData);
                localStorage.setItem('data', updatedDataString);
                }


            }
            ).catch(err => console.log(err))

        }
    }
    })

 

    const handleUpdate = (data: userData) => {
        saveItem.mutate(data)
        console.log(data)
    }
    return (
        <div className='overlay' >
            <div className='usermodelContainer'  >
                <div className='upper'>
                    <div className='top'>

                        Edit info       
                        <div className='back' onClick={onClose}>
                            x

                        </div>

                    </div>

                    {/* <div>
              <img src=''/>
            </div> */}
                </div>

                <div className='form-body'>

                    <section className='username'>
                        <div>
                            <img src="" />
                        </div>
                        <section>
                            <span>{firstName} {lastName}</span>
                        </section>

                    </section>

                    <form className='user-profile-form' onSubmit={handleSubmit(handleUpdate)} encType='multipart/form-data'>
                        <section className='user-prof-forms'>

                            <section className='namesection'>
                                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                                    <input placeholder='First name' defaultValue={firstName} style={{ width: "100%" }} {...register("firstName")} />



                                </div>

                                <div style={{ display: "flex", flexFlow: "column wrap" }}>
                                    <input placeholder='Last name' defaultValue={lastName} style={{ width: "100%" }} {...register("lastName")} />

                                </div>
                            </section>

                            <input placeholder='Email' defaultValue={email} className='email_input' {...register("email")} />


                            <input placeholder='Phone number' defaultValue={phoneNo} className='phoneno_input' {...register("phoneNo")} />

                            <input placeholder='Password' type='password'  className='location-input' {...register("password")} />



                        </section>

                        <section className='button_section'>
                            <button type='submit'>Save changes</button>
                        </section>
                    </form>


                </div>

            </div>

        </div>
    )
}

export default ProfileModel
