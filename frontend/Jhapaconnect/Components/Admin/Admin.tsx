    import React, { useEffect, useState } from 'react'
    import "./admin.css"
    import AdminLeft from './AdminLeft'
    import axios from 'axios'
    import { Bounce, toast } from 'react-toastify'
    import { ZodType, z } from 'zod'
    import { zodResolver } from '@hookform/resolvers/zod'
    import { useForm } from 'react-hook-form'
    import { useMutation } from 'react-query'
    const Admin = () => {
        const [icat ,setIcat] = useState([])
        const [ecat ,setEcat] = useState([])

        type catData = {
            categoryTitle: string;
        };

    
        
        const schema: ZodType<catData> = z.object({
            categoryTitle: z.string().min(4).max(60),
        });
        
        const { register: registerIcat, handleSubmit: handleSubmitIcat } = useForm<catData>({ resolver: zodResolver(schema) });
        const { register: registerEcat, handleSubmit: handleSubmitEcat } = useForm<catData>({ resolver: zodResolver(schema) });
        
        
        const saveEcat = useMutation({
            mutationKey: 'SAVECAT',
            mutationFn: async (requestData: catData) => {
            console.log(requestData)
            try {
                const response = await axios.post(`http://localhost:8080/api/v1/auth/eventcategories/create`, requestData);
                toast.success('🦄 Category created sucessfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            } catch (error) {
                toast.error('🦄 Error creating category try again!', {
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
                throw error;
            }
            }
        });
        
        const createEcat = (data: catData) => {
            if (!data.categoryTitle) {
            toast.error('🦄 Please fill the field', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            }
            saveEcat.mutate(data);
        };

        
        const saveIcat = useMutation({
            mutationKey: 'SAVICAT',
            mutationFn: async (requestData: catData) => {
            console.log(requestData)
            try {
                const response = await axios.post(`http://localhost:8080/api/v1/auth/categories/create`, requestData);
                toast.success('🦄 Category created sucessfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            } catch (error) {
                toast.error('🦄 Error creating category try again!', {
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
                throw error;
            }
            }
        });
        
        const createIcat = (data: catData) => {
            if (!data.categoryTitle) {
            toast.error('🦄 Please fill the field', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            }
            saveIcat.mutate(data);
        };

        const geticat = async()=>{
            axios.get(`http://localhost:8080/api/v1/auth/categories/`).then((res)=>{
                setIcat(res.data)
            })
        }

        const getecat = async ()=>{
            axios.get(`http://localhost:8080/api/v1/auth/eventcategories/`).then((res)=>{
                setEcat(res.data)
                console.log(res.data)
            })
        }

        const delecat = async(id)=>{
            axios.delete(`http://localhost:8080/api/v1/auth/eventcategories/delete/${id}`).then(()=>{
                window.location.reload()
            })
        }
        const delicat = async(id)=>{
            axios.delete(`http://localhost:8080/api/v1/auth/categories/delete/${id}`).then(()=>{
                window.location.reload()
            })
        }

        useEffect(()=>{
            getecat()
            geticat()
        },[])

    return (
        <>
        <AdminLeft/>

        <div className='admin_container'>

            <div className='admin_body'>

                <div className='admin-category'>
                    <div className='item-cat-title'>
                        <span>Item category</span>
                    </div>
                    <div className='category-admin-form'>
                        <form onSubmit={handleSubmitIcat(createIcat)}>
                            <input type='text' placeholder='Category name' {...registerIcat("categoryTitle")}/>
                            <button type={"submit"}> Add</button>
                        </form>

                    </div>
                    <div className='all-category'>
                        <span>Item categories</span>
                        {
                            icat.map((cat,key)=>(
                                <div className='icat'>
                                    <div className='icat-name'>
                                        {cat.categoryTitle}

                                        <button className='deli-btn' onClick={()=>{delicat(cat.categoryId)}}>Delete</button>
                                    
                                    </div>
                                </div>

                            )

                            )
                        }

                    </div>

                </div>

                <div className='admin-event_category'>
                    <div className='event-cat-title'>
                        <span>Event category</span>
                    </div>
                    <div className='event-category-admin-form'>
                        <form onSubmit={handleSubmitEcat(createEcat)}>
                            <input type='text' placeholder='Category name' {...registerEcat("categoryTitle")}/>
                            <button type='submit' > Add</button>
                        </form>

                    </div>
                    <div className='all-event-category'>
                    <span>Event categories</span>
                        {
                            ecat.map((cat,key)=>(
                                <div className='ecat'>
                                    <div className='ecat-name'>
                                        {cat.categoryTitle}

                                        <button className='dele-btn' onClick={()=>{delecat(cat.categoryId)}}>Delete</button>
                                    
                                    </div>
                                </div>

                            )

                            )
                        }

                    </div>

                </div>


            </div>
            
        
        </div>
        </>
    )
    }

    export default Admin
