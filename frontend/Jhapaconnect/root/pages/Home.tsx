import Sharepost from "@/components/post add/Sharepost"
import LeftSidebar from "@/components/shared/LeftSidebar"
import Stories from "@/components/stories/Stories"
import { Grid } from "lucide-react"
import { useEffect, useState } from "react"
import "./pages-css/home.css"
import Postcard from "@/components/post/Postcard"

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getAPIdata();
    }, [])

    const getAPIdata = async () => {
        try {
            const dataRespone = await fetch('http://localhost:8080/api/v1/auth/posts');
            console.log(dataRespone)
            if (!dataRespone.ok) {
                throw new Error("failed to load data")
            }
            const responseJSONdata = await dataRespone.json();
            console.log(responseJSONdata)
            setData(responseJSONdata);

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