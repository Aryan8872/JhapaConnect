    import axios from 'axios';
    import React, { useEffect, useState } from 'react'
    import { Link, useNavigate, useParams } from 'react-router-dom'
    import "./itemdetail.css"
import { authToken } from '../../root/pages/loginauth';
import ItemEditModel from './ItemEditModel';
import { Bounce, toast } from 'react-toastify';

    const ItemDetail = ({props , showDetail ,closeWindow}) => {
        if(!showDetail){
            return 
        }
        const localStorageData = localStorage.getItem('data');

        const parsedData = JSON.parse(localStorageData);
      
        const userData = parsedData.data.user;
      
        const userId = userData.id;
        const firstname = userData.firstName;
        const lastname = userData.lastName;
        const email = userData.email;
        const phoneNo = userData.phoneNo;

        const { addedDate, category, description,id, imageName, location, price, title,user } = props
        const {firstName,lastName} = user
        const [image,setImage] =useState();
        const [imageError, setImageerror] = useState(false);
        const[showOptions,setShowoptions] = useState(false);
        const[showedit,setShowEdit] = useState(false)
        const navigate = useNavigate();
         
        const getItemimage = async () => {
          try {
            if (!imageName) {
              // Handle the case where imageName is undefined
              setImageerror(true);
              return;
            }
      
            if(localStorage.getItem("jwtToken")){
                authToken(localStorage.getItem("jwtToken"))
                await axios.get(`http://localhost:8080/api/v1/auth/item/image/${imageName}`, {
                    responseType: 'blob'
                  }).then((res)=>{
                      const imageUrl = URL.createObjectURL(res.data);
                      setImage(imageUrl);
                      console.log(imageUrl)
      
                  }
                  );
            }
     
          } catch (error) {
            // Handle errors
            setImageerror(error.message);
          }
        }

        useEffect(() => {
            getItemimage()

            }, [])

        const deleteItem = async()=>{
            console.log(id)
            await axios.delete(`http://localhost:8080/api/v1/auth/item/delete/${id}`).then((res)=>{
            
                  window.location.reload()
                  toast.error(' Item delete sucessfully!', {
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
            })
        }
     
      
    return (
        <>
        <div className='item_preview'>
        <div className='preview_container'>
            <div className='preview_image_container'>
                <section className='preview_image'>
                <img src={image} />
                </section>
            </div>

            <section className='right_detail'>

                <div className='right_upper_container' >
                    <div className='post_head'>

                        <div  style={{ textDecoration: "none", color: "black", display: "flex", gap: "0.3rem" , width:"100%" }}>
                            <img src="assets/icons/connect.png" height={32} width={32} />
                            <span style={{ fontSize: "14px", display: "flex", flexFlow: "column wrap",width:"40%" }}>
                                <span style={{display:"flex",gap:"1.2rem", width:"100%"}}> {firstName} {lastName}</span>
                            


                            </span>
                            <span>.</span>

                            <span style={{ fontSize: "12px", color: "#737373" }}>{addedDate}</span>

                            { firstName === firstname && lastName === lastname &&

                            <div className='item-options-btn' onClick={()=>{!showOptions ? setShowoptions(true) :setShowoptions(false)}}>
                                <img src='/assets/icons/options.png' width={30} height={30}/>
                            </div>
    }
                            {showOptions &&
                            (<div className='item-options'>
                                <div className='edit-item' onClick={()=>{setShowEdit(true)}}>
                                    <img src='/assets/icons/edit.png' width={30} height={30}/>
                                    <span>Edit</span>
                                </div>
                                <hr/>
                                <div className='delete-item' onClick={()=>{deleteItem()}}>
                                    <img src='/assets/icons/delete.png' width={30} height={30}/>
                                    <span>Delete</span>
                                </div>

                            </div>)
                            
                            }
                        
                  

                        </div>

                    </div>

                    <div className='post_details'>

                        <div className='item-title'>
                            <span className='titlespan'>{title}</span>
                            <span className='locationspan'>Listed in {location}</span>

                        </div>

                        <div className='item-price'>
                            Price: रु {price}
                        </div>

                        <div className='description_section'>
                            {description}
                        </div>
                        <div className='right_lower' >      
                        <button style={{color:"#086FFF" , backgroundColor:"white" , border:"0.3px solid black", borderRadius:"0.3rem", display:"flex" , flexFlow:"row wrap", alignItems:"center", justifyContent:"center"}} onClick={()=>{navigate(`/item-bill/${id}`)}}>
                            <img src= "/assets/icons/buy.png"  width={20} height={20}/>
                            Buy
                            
                        </button>               
                        </div>
                    </div>
                    <hr />
                </div>
                <span className='closebtn' onClick={()=>{closeWindow()}}>
                    <img src='assets/icons/back-button.png'/>
                </span>

            </section>
        </div>
    </div >

    <ItemEditModel onClose={()=>{setShowEdit(false)}} itemId={id}  show={showedit}/>
    </>
    )
    }

    export default ItemDetail
