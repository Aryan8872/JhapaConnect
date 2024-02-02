import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Topbax from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"


const RootLayout=()=>{
    return (
        <>
        <div className="w-full md:flex gap-6">
            <Topbax/>
            <LeftSidebar/>

            <section className="pages-parent w-full ">

                <Outlet/>

            </section>

            <Bottombar/>

        </div>
        </>
    )
}

export  default  RootLayout