import LeftSidebar from "@/components/shared/LeftSidebar"
import PostCard from "@/components/shared/PostCard"
import RightSidebar from "@/components/shared/RightSidebar"
import { Grid } from "lucide-react"
import { useEffect, useState } from "react"
const Home=()=>{
    const [data, setData] = useState([])
    useEffect(()=>{
        getAPIdata();
    },[])

    const getAPIdata = async ()=>{
        try{
            const dataRespone= await fetch ('http://localhost:8080/post/posts');
            console.log(dataRespone)
            if (!dataRespone.ok){
                throw new Error("failed to load data")
            }
            const responseJSONdata = await dataRespone.json();
            console.log(responseJSONdata)
            setData(responseJSONdata);
        
        }
        catch(error){
            console.log(error)
        }

    }
    return(
        <>
        <div className="flex flex-1  text-font-black ">
            <div className=" flex flex-col flex-1 items-center gap-10 overflow-scroll py-10 px-5 md:px-8 lg:p-14 custom-scrollbar">
                <div className="max-w-screen-sm flex flex-col items-center w-full gap-6 md:gap-9">
                    <h2 
                    className="text-[24px] font-bold leading-[140%] tracking-tighter md:text-[30px] font-bold leading-[140%] tracking-tighter text-left w-full"
                    >Home feed
                    </h2>

                    <ul className="flex flex-col flex-1 gap-9 w-full">

                        {data.map((post,index)=>(
                            <PostCard key={index} props={post}/>


                        ))}

                    </ul>

                </div>
            </div>

        </div>
        
        

       
        </>
    )
}

export default  Home