import Navbar from "../../Components/navbar/Navbar"
import Bottombar from "../../Components/BottomBar/Bottombar"
import { Outlet } from "react-router-dom"
import Leftbar from "../../Components/leftbar/Leftbar"
import Rightbar from "../rightbar/Rightbar"
import "./root.css"


const RootLayout = () => {
    return (
        <>
            <div className="parent" style={{ width: "100%" }}>
                <Navbar />

                <div style={{ display: "flex",height:"100vh"}}>
                    <Leftbar/>
                    <div className="outlet">
                      <Outlet/>
                    </div>
                    <Rightbar/>

                </div>







            <Bottombar/>

        </div >
        </>
    )
}

export default RootLayout