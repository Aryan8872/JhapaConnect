import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './item.css'
import ItemDetail from '../itempreview/ItemDetail';

const ItemCard = ({ props }) => {

  const [image, SetImage] = useState("");
  const [Data, SetData] = useState([]);
  const [showDetail,setShowdetail] = useState(false)
  const { addedDate, category, description,id, imageName, location, price, title,user } = props
  const {firstName,lastName} = user

  const [imageError, setImageerror] = useState(false);



  useEffect(() => {
    SetData(props)
    getItemimage()

  }, [])


  const getItemimage = async () => {
    try {

      if (!imageName) {
        // Handle the case where imageName is undefined
        setImageerror(true);
        return;
      }

      
      const response = await axios.get(`http://localhost:8080/api/v1/auth/item/image/${imageName}`, {
        responseType: 'blob'
      });

      // Create a blob URL from the image data
      const imageUrl = URL.createObjectURL(response.data);

      // Set the image URL to state
      SetImage(imageUrl);
    } catch (error) {
      // Handle errors
      setImageerror(error.message);
    }
  }

  const navigate = useNavigate();



  return (

    <>

        
          <div className='item' onClick={()=>(setShowdetail(true))} >

            <div className='image_container'>
              {imageError ? <div>Error while loading image</div> : (<img src={image} />)}

            </div>

            <div className='product_info'>
              <span style={{ fontSize: "17px" }}>रू{price}</span>
              <span style={{ fontSize: "15px", color: "#737373" }}>{title}</span>
              <span style={{ fontSize: "13px", color: "#737373" }}>{location}</span>
            </div>

          </div>

          <ItemDetail props={props} showDetail={showDetail} closeWindow={()=>{
            setShowdetail(false)
          }}/>



      </>

  )
}

export default ItemCard
