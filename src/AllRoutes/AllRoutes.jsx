import { Route, Routes } from "react-router-dom"


export const AllRoutes = ()=>{
    return(
        <Routes>
            <Route path="/" element={"Home"}/>
            <Route path="/login" element={"Login"}/>
            <Route path="/register" element={"Register"}/>
            <Route path="*" element={"404 Page not found"}/>
        </Routes>
    )
}