import React from 'react'
import "./pages-css/explore.css"
import { Link } from 'react-router-dom'
const Explore = () => {
  return (
    <div className='explore'>
      <div className='items-container'>
        <Link to="" style={{textDecoration:"none" , color:"black"}}>
        <div className='item'>
          <div className='image_container'>
            <img src="/assets/icons/market.png"/>
          </div>

          <div className='product_info'>
            <span style={{fontSize:"17px"}}>रू16,500</span>
            <span style={{fontSize:"15px", color:"#737373"}}>Pulsar ns</span>
            <span style={{fontSize:"13px" , color:"#737373"}}>Jhapa,nepal</span>
          </div>

        </div>
        </Link>

      </div>
    </div>
  )
}

export default Explore
