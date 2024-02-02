import Navbar from "@/components/navbar/Navbar"
import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Topbax from "@/components/shared/Topbar"
import { Outlet } from "react-router-dom"
import Leftbar from "@/components/leftbar/Leftbar"
import Rightbar from "../rightbar/Rightbar"


const RootLayout = () => {
    return (
        <>
            <div className="parent" style={{ width: "100%" }}>
                <Navbar />

                <div style={{ display: "flex" }}>
                    <Leftbar/>
                    <div style={{ flex: 6 }}>
                      <Outlet/>
                    </div>
                    <Rightbar/>
            </div>


            {/* <LeftSidebar/> */}

            {/* <section className="pages-parent w-full "> */}

            {/* <Outlet/> */}

            {/* </section> */}

            {/* <Bottombar/> */}

        </div >
        </>
    )
}

export default RootLayout