import React, { useEffect, useState } from 'react'
import "./pages-css/market.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios';
import ItemCard from '../../Components/Itemcard/ItemCard';
import { authToken } from './loginauth';
import Navbar from '../../Components/navbar/Navbar';
import MarketLeftBar from '../../Components/MarketLeftbar/MarketLeftBar';
import Bottombar from '../../Components/BottomBar/Bottombar';
import { Bounce, toast } from 'react-toastify';

const Marketplace = () => {


  const [Item, SetItem] = useState();
  const [SearchkeyWord, setSearchKeyword] = useState();
  const [categories,SetCategories] = useState([])
  console.log(localStorage.getItem("jwtToken"))
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenExpiration()
    getItems()
  }, [])


  
  const checkTokenExpiration = () => {
    const token = localStorage.getItem('jwtToken');

    if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the token payload
        const currentTime = Date.now() / 1000; // Current time in seconds

        if (decodedToken.exp < currentTime) {
            // Token is expired, redirect to the login page
            navigate('/Login') 
            // Change '/login' to your login page URL
            localStorage.clear()

        }
    } else {
        // Token not found, redirect to the login page
        navigate('/Login') 
        localStorage.clear()
      
    }
};

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
    if(SearchkeyWord == ""){
      toast.error('Please provide keyword for search operation!', {
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
