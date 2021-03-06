import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button,
    Alert,
    AlertIcon,
    Spinner,
  } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUser } from '../../Redux/Auth/auth.action'

export const Login = ()=>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store)=>store.auth.user)
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    
    const [loadingState, setLoadingState] = useState(false);
    const [errorstate, setErrorState] = useState(false)
    const handleChange = (e)=>{
        const {id, value} = e.target;
        setFormData({...formData, [id]:value}); 
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoadingState(true);
        setErrorState(false);
        axios.post("https://apartment-manager-backend.herokuapp.com/auth/login", formData).then((res)=>{
            console.log(res.headers, res.data);
            const payload = {
                id: res.data.user._id,
                username: res.data.user.username,
                email: res.data.user.email,
                token: res.data.token
            }
            dispatch(setUser(payload));
            setLoadingState(false);
            setErrorState(false);
            navigate("/")
        }).catch((er)=>{
            setLoadingState(false)
            setErrorState(true);
        })
    }

    return(
        <Box width="30%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
            {loadingState?<Spinner/>:<FormControl >
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input onChange={handleChange} value={formData.email} id='email' type='email' placeholder="Email" />
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input onChange={handleChange} value={formData.password} id='password' type='password' placeholder="Password" />
            <Button colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Login</Button>            
        </FormControl>}
        
        {errorstate&&<Alert status='error'>
            <AlertIcon />
            Invalid! Try Again
        </Alert>}
        </Box>
    )
}