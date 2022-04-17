import { Box} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";


export const Navbar = ()=>{
    const user = useSelector((store)=>store.auth.user);
    return (
        <Box display={"flex"} justifyContent="space-between" border="1px solid black" padding="20px" backgroundColor="teal" color="white">
            <Link to="/">Home</Link>
            {user? <Box display={"flex"} justifyContent="space-around" gap="50px">
                <div><Link to="/addflat">Add Flat</Link></div>
                <div><Link to="/addresident">Add Resident</Link></div>
                
                </Box>:<Box display={"flex"} justifyContent="space-between" gap="50px">
                    <div><Link to="/login">Login</Link></div>
                    <div><Link to="/register">Register</Link></div>
                    
            </Box>}
            
            
        </Box>
    )
}