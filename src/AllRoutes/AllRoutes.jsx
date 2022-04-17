import { Route, Routes } from "react-router-dom"
import { Login } from "../Components/Login/Login"
import { Register } from "../Components/Register/Register"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={"Home"}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/addflat" element = {"Add Flat"}/>
            <Route path="/addresident" element={"Add Resident"}/>
            <Route path="*" element={"404 Page not found"}/>
        </Routes>
    )
}