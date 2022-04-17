import { useDispatch, useSelector } from "react-redux"
import { Navigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Button,
    Select
  } from '@chakra-ui/react'
import { useState } from "react";
import { addFlat } from "../../Redux/Flats/flat.action";


export const AddFlats = ()=>{
    const user = useSelector((store)=>store.auth.user);
    const dispatch = useDispatch()
    

    const [formData, setFormData] = useState({
        residentType: "Owner",
        block: "",
        number: "",
        numberOfResidents: 0,
        createdUser : user.id    
    })

    const handleChange = (e)=>{
        const {id, value} = e.target
        setFormData({...formData, [id]:value});
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(addFlat(formData));
        setFormData({
            residentType: "Owner",
            block: "",
            number: "",
            numberOfResidents: 0,
            createdUser : user.id    
        })
    }
    if(!user){
        return <Navigate to="/login"/>
    }
    
    return (
        <Box width="30%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
            <h1>Add A Flat</h1>
        <FormControl >
            <FormLabel  htmlFor='residentType'>Type</FormLabel>
            <Select value={formData.residentType} id="residentType" placeholder='Select option'>
                <option value='Owner'>Owner</option>
                <option value='Tenant'>Tenant</option>
            </Select>
            <FormLabel htmlFor='block'>Block</FormLabel>
            <Input onChange={handleChange} value={formData.block} id='block' type='text' placeholder="Block: A,B,C..." />
            <FormLabel htmlFor='number'>Number</FormLabel>
            <Input onChange={handleChange} value={formData.number} id='number' type='number' placeholder="House Number" />
            {formData.residentType&&formData.block&&formData.number?<Button colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Flat</Button>:<Button disabled colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Flat</Button>  }           
        </FormControl>
        </Box>
    )
}