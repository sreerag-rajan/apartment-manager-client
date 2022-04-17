import { Box} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux";


export const Navbar = ()=>{
    const user = useSelector((store)=>store.auth.user);
    return (
        <Box display={"flex"} justifyContent="space-around" border="1px solid black" padding="20px" backgroundColor="teal" color="white">
            <Link to="/">Home</Link>
            {user? <div>
                <Link to="/addflat">Add Flat</Link>
                <Link to="/addresident">Add Resident</Link>
                </div>:<div>
                    <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>}
            
            
        </Box>
    )
}