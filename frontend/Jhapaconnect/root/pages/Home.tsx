import Sharepost from "../../Components/post add/Sharepost"
import Stories from "../../Components/stories/Stories"
import { useEffect, useState } from "react"
import "./pages-css/home.css"
import Postcard from "../../Components/post/Postcard"
import axios from "axios"
import { authToken } from "./loginauth"

const Home = () => {
    const [data, setData] = useState([])
 
    useEffect(() => {
        getAPIdata();
    }, [])

    const getAPIdata = async () => {
        try {
            if(localStorage.getItem("jwtToken")){
                authToken(localStorage.getItem("jwtToken"))
                const dataRespone = await axios.get("http://localhost:8080/api/v1/auth/posts"
                ).then((res)=>{
                    setData(res.data)
                });
                console.log(dataRespone)

            }

            else{
                alert("invalid token")
            }
          
        }
        catch (error) {
            console.log(error)
        }

    }
    return (
            <div className="home">
                <Stories/>
                <Sharepost/>
           

                <ul className="posts_parent">
                    {
                        data.map((post,key)=>(
                            <Postcard props={post} key={key}/>

                        ))
                    }
                
                </ul>

            </div>
    )
}

export default Home