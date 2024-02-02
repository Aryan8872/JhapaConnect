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
                    <section className="flex flex-1 justify-center items-center flex-col py-10">
                        <Outlet/>
                    </section>

                    <img src="https://www.kochiesbusinessbuilders.com.au/wp-content/uploads/2019/08/customer-connection.jpg"
                    className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"

                    />
                </>

                    )}




        </>


    )
}
export  default  AuthLayout;