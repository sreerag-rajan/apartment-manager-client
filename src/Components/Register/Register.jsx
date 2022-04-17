import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button
  } from '@chakra-ui/react'
import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Register = ()=>{
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username:"",
        email:"",
        password:""
    })

    const handleChange = (e)=>{
        const {id, value} = e.target;
        setFormData({...formData, [id]:value}); 
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        axios.post("https://apartment-manager-backend.herokuapp.com/auth/register", formData).then((res)=>{
            console.log(res.headers, res.data);
            navigate("/login")
        })
    }

    return(
        <Box width="30%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
        <FormControl >
            <FormLabel htmlFor='username'>Name</FormLabel>
            <Input onChange={handleChange} value={formData.username} id='username' type='username' placeholder="Name" />
            <FormLabel htmlFor='email'>Email address</FormLabel>
            <Input onChange={handleChange} value={formData.email} id='email' type='email' placeholder="Email" />
            <FormLabel htmlFor='password'>Password</FormLabel>
            <Input onChange={handleChange} value={formData.password} id='password' type='password' placeholder="Password" />
            <Button colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Register</Button>            
        </FormControl>
        </Box>
    )
}