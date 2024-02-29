
import './index.css'
import { Routes, Route } from 'react-router-dom';
import SigninForm from "../auth/forms/SigninForm.tsx";
import { AllUsers, Home, Marketplace, Eventspage,  Login, Register, Additem } from "../root/pages/index.ts";    //the index.ts file makes the export more easier as wen can import other pages within it
import SignupForm from "../auth/forms/SignupForm.tsx";
import AuthLayout from "../auth/AuthLayout.tsx";
import RootLayout from "./components/root/RootLayout.tsx";
import { QueryClient, QueryClientProvider } from 'react-query';
import Itempreview from './components/Postpreview/Postpreview.tsx';

import { useState } from 'react';
import { isLoggedin } from "../root/pages/loginauth.tsx"
import ItemBill from './components/Item bill/ItemBill.tsx';
import ItemDetail from './components/itempreview/ItemDetail.tsx';
import Profile from './components/profile/Profile.tsx';
import Eventpreview from './components/Eventpreview/Eventpreview.tsx';
import EventTicket from './components/Event ticket/EventTicket.tsx';
import UserProfile from './components/profile/Userprofile.tsx';

function App() {


    console.log(isLoggedin())
    const queryclient = new QueryClient();

    return (
        <>
            <main className="main">
                <QueryClientProvider client={queryclient}>

                    <Routes>

                        {/* public routes. they are login signup*/}
                        <Route element={<AuthLayout />}>
                            {
                                isLoggedin() === false &&
                                <Route path="/login" element={<Login />} />


                            }
                            {
                                !isLoggedin() &&
                                <Route path="/register" element={<Register />} />

                            }

                        </Route>



                        {/* private routes. they are only accessed after logging in */}

                        {isLoggedin() == true &&
                            <Route element={<RootLayout />}>
                                <Route index element={<Home />} />    {/* index means the starting page*/}
                                <Route path="/all-users" element={<AllUsers />} />
                                <Route path="/post/:postId" element={<Itempreview />} />
                                <Route path="/user-profile" element={<Profile/>} />
                                <Route path = "/profile/:Id" element={<UserProfile/>}/>
                                <Route path="/item/:itemId/category/:catId" element={<Itempreview />} />
                                <Route path="/add-item" element={<Additem />} />
                                <Route path="/item-bill/:Id" element={<ItemBill/>}/>
                                <Route path="/event-ticket/:Id" element={<EventTicket/>}/>
                            </Route>

                        }
                        { isLoggedin()==true &&
                            <Route path="/market" element={<Marketplace />} />
                        }


                        { isLoggedin()==true &&
                                <Route path="/Events" element={<Eventspage />} />
                        }

                        { isLoggedin()==true &&
                                <Route path="/detail/:Id" element={<ItemDetail />} />
                        }

                        {
                            isLoggedin()== true &&
                            <Route path='/event-details/:Id' element={<Eventpreview/>}/>
                            
                        }




                    </Routes>
                </QueryClientProvider>


            </main>


        </>
    )
}

export default App
