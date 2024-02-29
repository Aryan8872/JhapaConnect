import React, { useEffect, useState } from 'react'
import "./pages-css/market.css"
import { Link, Outlet } from 'react-router-dom'
import axios from 'axios';
import ItemCard from '@/components/Itemcard/ItemCard';
import { authToken } from './loginauth';
import Navbar from '@/components/navbar/Navbar';
import MarketLeftBar from '@/components/MarketLeftbar/MarketLeftBar';
import Bottombar from '@/components/BottomBar/Bottombar';

const Marketplace = () => {


  const [Item, SetItem] = useState();
  const [SearchkeyWord, setSearchKeyword] = useState();
  const [categories,SetCategories] = useState([])

  useEffect(() => {
    getItems()
  }, [])

  const getItems = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get("http://localhost:8080/api/v1/auth/items").then((res) => {
        SetItem(res.data);
      })
    }

  }

  const getCategory = async()=>{
    if(localStorage.getItem("jwtToken")){
      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get("http://localhost:8080/api/v1/auth/categories/").then((res)=>{
        SetCategories(res.data)
        console.log(categories)
     
      })
    }
  }

  const searchBycategory = async(keyword)=>{
    if(localStorage.getItem("jwtToken")){

      authToken(localStorage.getItem("jwtToken"))
      const data = await axios.get(`http://localhost:8080/api/v1/auth/category/${keyword}/items`).then((res)=>{
        SetItem(res.data)
        console.log(res.data)
      })
    }
  }



  const searchItems = async () => {
    if (localStorage.getItem("jwtToken")) {
      authToken(localStorage.getItem("jwtToken"))
      if (SearchkeyWord != null) {
        const data = await axios.get(`http://localhost:8080/api/v1/auth/items/search/${SearchkeyWord}`).then((res) => {
          SetItem(res.data);
          console.log(categories)
        }
        )
      }
    }
  }
  const handleSearch = (event) => {
    setSearchKeyword(event?.target.value)
    console.log(event.target.value)
  }






  if (!Item) {
    return <div>Loading</div>
  }





  return (
    <>
      <Navbar />
      <div className='market'>
      <MarketLeftBar handleSearch={handleSearch} searchItems={searchItems} categories={categories} getCategories={getCategory} searchBycat={searchBycategory} getAll={getItems}/>

   

        <div className='items-container'>

          {Item.map((data, key) => (

            <ItemCard props={data} key={key} />


          ))}

        </div>
      </div>
      <Bottombar/>
    </>
  )
}


export default Marketplace
