import React from 'react'
import "./pages-css/add-item.css"
import {Link} from "react-router-dom"
import Itempreview from '@/components/itempreview/Itempreview'

const Additem = () => {
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
          <form className='add_item_form'>

            <div className='image_section'>
              <input type='file'/>

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
                <input placeholder='Title'/>
                <input placeholder='Price'/>
                <input placeholder='Category'/>
                <input placeholder='Location'/>

              </div>


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
