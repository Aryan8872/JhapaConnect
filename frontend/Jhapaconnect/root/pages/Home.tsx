import Sharepost from "@/components/post add/Sharepost"
import LeftSidebar from "@/components/shared/LeftSidebar"
import PostCard from "@/components/shared/PostCard"
import RightSidebar from "@/components/shared/RightSidebar"
import Stories from "@/components/stories/Stories"
import { Grid } from "lucide-react"
import { useEffect, useState } from "react"
import "./pages-css/home.css"

const Home = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        getAPIdata();
    }, [])

    const getAPIdata = async () => {
        try {
            const dataRespone = await fetch('http://localhost:8080/post/posts');
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
                <h2
                    className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] font-bold leading-[140%] tracking-tighter text-left w-full"
                >Home feed
                </h2>

                <ul className="flex flex-col flex-1 gap-9 w-full">

                    {data.map((post, index) => (
                        <PostCard key={index} props={post} />

                    ))}

                </ul>

            </div>
    )
}

export default Home