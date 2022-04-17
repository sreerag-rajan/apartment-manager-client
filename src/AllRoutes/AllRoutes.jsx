import { Route, Routes } from "react-router-dom"
import { AddFlats } from "../Components/AddFlats/AddFlats"
import { AddResidents } from "../Components/AddResidents/AddResidents"
import { Home } from "../Components/Home/Home"
import { Login } from "../Components/Login/Login"
import { Register } from "../Components/Register/Register"
import { ShowResidents } from "../Components/ShowResidents/ShowResidents"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/addflat" element = {<AddFlats/>}/>
            <Route path="/addresident" element={<AddResidents/>}/>
            <Route path="/flat/:id" element={<ShowResidents/>}/>
            <Route path="*" element={"404 Page not found"}/>
        </Routes>
    )
}