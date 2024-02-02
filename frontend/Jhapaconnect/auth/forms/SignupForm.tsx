import {Button} from "@/components/ui/button.tsx";
import { useForm } from "react-hook-form";
import {ZodType, z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { useMutation } from "react-query";
import axios from "axios";


const SignupForm=()=>{

    type FormData = {
        firstName:string;
        lastName:string;
        email:string;
        phoneNo:string;
        password:string;
    }

    const schema:ZodType<FormData> = z.object({
        firstName:z.string().min(2).max(30),
        lastName:z.string().min(2).max(30),
        email:z.string(),
        phoneNo:z.string().min(10).max(10),
        password:z.string().min(10).max(20)
    })

    const {register , handleSubmit , formState}= useForm <FormData>({resolver:zodResolver(schema)});

    const saveData =useMutation({
        mutationKey:"SAVEDATA",
        mutationFn:(requestData:FormData)=>{
            return  axios.post("http://localhost:8080/user/register", requestData)
        }
    })



    const createUser=(data:FormData)=>{
        saveData.mutate(data);
        console.log(data);
    }

    return(
        <>
        <div>
            <form className="text-font-black" onSubmit={handleSubmit(createUser)}>
                <div>
                    <label>first name</label>
                    <input type="text" placeholder="first name" {...register("firstName")}/>
                </div>
                <div>
                    <label>lastname</label>
                    <input type="text" {...register("lastName")}/>
                </div>
                <div>
                    <label>email</label>
                    <input type="text" {...register("email")}/>
                </div>
                <div>
                    <label>phone number</label>
                    <input type="text " {...register("phoneNo")}/>
                </div>
                <div>
                    <label>password</label>
                    <input type="password" {...register("password")}/>
                </div>

                <div>
                    <input type={"submit"} value={"submit"} />
                </div>
            </form>
        </div>
        </>
    )
}

export default  SignupForm

