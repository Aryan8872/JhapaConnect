import {Navigate, Outlet} from "react-router-dom";


//it will wrap the auth form
const AuthLayout=()=>{
    const isAuthenticated=false;

    return(
        <>

            {isAuthenticated?(
                <Navigate to={"/"}/>  //if authenticated navigate the user to home else render outlet meaning what has to be on the site i.e signin or signup form
            ):(
                <>
                    <section style={{width:"100%"}}>
                        <Outlet/>
                    </section>



                </>

                    )}




        </>


    )
}
export  default  AuthLayout;