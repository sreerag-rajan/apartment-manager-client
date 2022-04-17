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
import { useEffect, useState } from "react";
import { getFlatsData } from "../../Redux/Flats/flat.action";
import { addResident } from "../../Redux/Residents/resident.action";


export const AddResidents = ()=>{
    const user = useSelector((store)=>store.auth.user);
    const flats = useSelector((store)=>store.flats.flats);
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getFlatsData())
    },[])

    const [formData, setFormData] = useState({
        name: "",
        gender: "",
        age: "",
        flat: 0,
        createdUser : user.id    
    })

    const handleChange = (e)=>{
        const {id, value} = e.target
        setFormData({...formData, [id]:value});
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        dispatch(addResident(formData));
        setFormData({
            name: "",
            gender: "",
            age: "",
            flat: 0,
            createdUser : user.id    
        })
    }
    if(!user){
        return <Navigate to="/login"/>
    }
    
    return (
        <Box width="30%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
            <h1>Add A Resident</h1>
        <FormControl >
            
            <FormLabel htmlFor='name'>Name</FormLabel>
            <Input onChange={handleChange} value={formData.name} id='name' type='text' placeholder="Name of Resident" />
            <FormLabel htmlFor='age'>Age</FormLabel>
            <Input onChange={handleChange} value={formData.age} id='age' type='number' placeholder="Age" />
            <FormLabel  htmlFor='gender'>Gender</FormLabel>
            <Select onChange={handleChange} value={formData.gender} id="gender" placeholder='Select option'>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
            </Select>
            <FormLabel  htmlFor='flat'>Flat</FormLabel>
            <Select onChange={handleChange} value={formData.flat} id="flat" placeholder='Select option'>
                {flats.map((el)=>{
                    return <option key={el._id} value={el._id}>Block: {el.block} H.No: {el.number}</option>
                })}
                
            </Select>
            {formData.name&&formData.age&&formData.gender&&formData.flat?<Button colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Resident</Button>:<Button disabled colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Resident</Button>  }           
        </FormControl>
        </Box>
    )
}