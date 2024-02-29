import axios from "axios"

export const isLoggedin = ()=>{
    let data = localStorage.getItem("data")
    if(data === null){
        return false
    }
    else{
        return true
    }
}

export const authToken =(token)=>{
    if(token){
        axios.defaults.headers.common['Authorization'] =`${token}`
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }

}


export const doLoginVeify = (data,next) =>{
    localStorage.setItem("data",JSON.stringify(data))  //key is data
    next()
}


export const getCurrentUser =()=>{
    if(isLoggedin){
        return JSON.parse(localStorage.getItem("data")).user;
        
    }else{
        return false;
    }

}
export const doLogout = (next)=>{
    localStorage.removeItem("data")
    next();

}