 
import './index.css'
import {Routes,Route} from  'react-router-dom';
import SigninForm from "../auth/forms/SigninForm.tsx";
import {AllUsers, CreatePost, Explore, Home, PostDetails, Marketplace, Profile, Eventspage, UpdatePost, UpdateProfile,Login,Register, Additem} from "../root/pages/index.ts";    //the index.ts file makes the export more easier as wen can import other pages within it
import SignupForm from "../auth/forms/SignupForm.tsx";
import AuthLayout from "../auth/AuthLayout.tsx";
import RootLayout from "./components/root/RootLayout.tsx";
import { QueryClient, QueryClientProvider } from 'react-query';
import Itempreview from './components/itempreview/Itempreview.tsx';
import Postimageuploader from './components/image uploader/Postimageuploader.tsx';
import Itemimageuploader from './components/image uploader/ItemImage upload/Itemimageuploader.tsx';

function App() {

    const queryclient = new QueryClient();

    return (
        <>
            <main className="main">
            <QueryClientProvider client={queryclient}>
                <Routes>

                    {/* public routes. they are login signup*/}
                    <Route element={<AuthLayout/>}>
                        {/* within authlayout we are placing these 2 pages wrapping them. the pages will change within the same  route*/}
                        <Route path="/Login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>

                    </Route>



                    {/* private routes. they are only accessed after logging in */}
                    <Route element={<RootLayout/>}>
                        <Route index element={<Home/>}/>    {/* index means the starting page*/}
                        <Route path="/explore" element={<Explore/>}/>
                        <Route path="/Events" element={<Eventspage/>}/>
                        <Route path="/all-users" element={<AllUsers/>}/>
                        <Route path="/create-post" element={<CreatePost/>}/>
                        <Route path="/update-post" element={<UpdatePost/>}/>
                        <Route path="/market" element={<Marketplace/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/post/:postId" element={<Itempreview/>}/>
                        <Route path="/post/:postId/image/upload" element={<Postimageuploader/>}/>
                        <Route path="/item/:itemId/image/upload" element={<Itemimageuploader/>}/>

                        <Route path="/update-profile" element={<UpdateProfile/>}/>
                        <Route path = "/item/:itemId/category/:catId" element={<Itempreview/>}/>

                    </Route>
                    <Route path="/add-item" element={<Additem/>}/>
                
                        

                </Routes>
                </QueryClientProvider>


            </main>


        </>
    )
}

export default App
