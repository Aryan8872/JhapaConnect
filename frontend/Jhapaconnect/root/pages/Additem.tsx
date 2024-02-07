import React, { useEffect, useState } from 'react'
import "./pages-css/add-item.css"
import {Link, useNavigate} from "react-router-dom"
import Itempreview from '@/components/itempreview/Itempreview'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodType, z } from 'zod'
import { useMutation } from 'react-query'
import axios from 'axios'

const Additem = () => {

  const [itemId,setItemid] =useState(null);
  const [formsubmit,setFormsubmit] = useState(false);
  const navigate = useNavigate();

  
  type itemData = {
    title:string,
    price:string,
    description:string,
    location:string,
    
    
  }
  const schema:ZodType<itemData> =z.object({
    title:z.string(),
    price:z.string(),
    description:z.string(),
    location:z.string(),

  }) 

  const {register , handleSubmit ,formState} = useForm<itemData>({resolver:zodResolver(schema)})


  const saveItem = useMutation({
    mutationKey:"SAVEITEM",
    mutationFn: async (data:itemData) =>{
      const item = await axios.post("http://localhost:8080/api/v1/auth/user/1/category/1/item",data).then(
        response =>{
          setItemid(response.data.id)
          setFormsubmit(true)
          console.log(response)

        }
      ).catch(err => console.log(err))

    }
  })

  useEffect(() => {
    if (formsubmit  && itemId) {
      navigate(`/item/${itemId}/image/upload`);
    }
  }, [formsubmit, itemId, navigate]);

  const handlePost =(data:itemData)=>{
    saveItem.mutate(data)
    console.log(data)
  }

  return (
    <>
    <div className='Addditem'>

      <div className='item_form'>

        <section className='back_btn'>
          <Link to="/">
            <div className='back_btn-container' >
              <img src="/assets/icons/cancel.png"/>
            </div>
          </Link>

          <div className='logo'>
            <img src="/assets/icons/connect.png"/>
            </div>
            <span>People connect</span>

        </section>
        <hr style={{  padding:"1.2px" ,color:"ebedf40"}}/>


        <section className='form_upper'>
          <div >
            <span style={{fontSize:"14px", color:"#65676B"}}>Marketplace</span>
            <span  style={{fontSize:"24px",}}>Item for sale</span>
          </div>
         

        </section>

        <section className='form_body_item'>
          <div className='user-section'>
            <div className='user-section_container'>
              <section>
                <img src='assets/icons/connect.png' height={40} width={40}/>
              </section>

              <section className='username_container'>
                <span style={{fontSize:"14px"}}>Username</span>
                <span  style={{fontSize:"13px", color:"#65676B"}}>Listing to marketplace</span>
              </section>

            </div>


          </div>
          <form className='add_item_form' encType='multipart/form-data' onSubmit={handleSubmit(handlePost)}>

            <div className='image_section'>
              <input type='file'  {...register("image")}  name='image'/>

              <div className='image_label'>
                <div style={{width:"30px", height:"30px"}}>
                  <img src="/assets/icons/addimage.png" style={{width:"25px" , height:"25px"}}/>
                </div>
                <span>Add photos</span>

              </div>
              
          
            </div>

            <section className="fields_section">
              <span>Required Fields</span>

              <div className='fields'>
                <input placeholder='Title' {...register("title")}/>
                <input placeholder='Price'  {...register("price")}/>
                <input placeholder='Description'  {...register("description")}/>

                {/* <input placeholder='Category'/> */}
                <input placeholder='Location'  {...register("location")}/>

              </div>

              <button type='submit'>submit</button>


            </section>
          </form>

        </section>
        
      </div>

    </div>
{/* 
    <section className='item_preview'>
      <Itempreview/>
    </section> */}
    </>
  )
}

export default Additem
