
import axios from "axios"
import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Select
  } from '@chakra-ui/react'
import { useDispatch } from "react-redux"
import { deleteResident } from "../../Redux/Residents/resident.action"
import { getFlatsData } from "../../Redux/Flats/flat.action"
import { useSelector } from "react-redux"


export const ShowResidents = ()=>{
    const [residents, setresidents] = useState([])
    const [flat, setFlat] = useState("")
    const {id} = useParams()
    const dispatch = useDispatch()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editResident, setEditResident] = useState({})
    const flats = useSelector((store)=>store.flats.flats);

    useEffect(()=>{
        dispatch(getFlatsData())
    },[])
    
    useEffect(()=>{
        axios.get(`https://apartment-manager-backend.herokuapp.com/resident/flat/${id}`).then(({data})=>{
            setresidents(data);
            let x = `${data[0].flat.block} ${data[0].flat.number}` 
            setFlat(x); 
        })
    },[])

    const handleDelete = (residentId)=>{
        
        dispatch(deleteResident(residentId, id))
    }

    const openModal = (resident)=>{
        console.log(flat)
        setEditResident(resident)
        onOpen();
    }
    const [formData, setFormData] = useState({
        name: editResident.name,
        gender: editResident.gender,
        age: editResident.age,
        flat: editResident.flat,
        createdUser : editResident.createdUser    
    })

    useEffect(()=>{
        setFormData({
            name: editResident.name,
            gender: editResident.gender,
            age: editResident.age,
            flat: editResident.flat,
            createdUser : editResident.createdUser  
        })
    },[editResident])

    const handleChange = (e)=>{
        const {id, value} = e.target
        setFormData({...formData, [id]:value});
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        axios.patch(`https://apartment-manager-backend.herokuapp.com/resident/${editResident._id}`, formData).then(()=>{
            axios.get(`https://apartment-manager-backend.herokuapp.com/flat/${id}`).then(({data})=>{
            setresidents(data);
            let x = `${data[0].flat.block} ${data[0].flat.number}` 
            setFlat(x); 
        })
        })
        setFormData({
            name: editResident.name,
            gender: editResident.gender,
            age: editResident.age,
            flat: editResident.flat,
            createdUser : editResident.createdUser  
        })
    }
    return(
        <div>
            {flat&&<h1>House {flat}</h1>}
            {residents&&<TableContainer width="80%" margin="auto" marginTop="30px">
                <Table variant='striped'>
                    <Thead border="2px solid teal">
                    <Tr>
                        <Th>Name</Th>
                        <Th>Age</Th>
                        <Th>Gender</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {residents.map((el)=>{
                            return <Tr key={el._id}>
                            <Td>{el.name}</Td>
                            <Td>{el.age}</Td>
                            <Td>{el.gender}</Td>
                            <Td> <Button onClick={()=>{openModal(el)}} colorScheme={"yellow"}>Edit</Button> </Td>
                            <Td> <Button onClick={()=>{handleDelete(el._id)}} colorScheme={"red"}>Delete</Button> </Td>
                        </Tr>
                        })}
                    
                    </Tbody>
                </Table>
                </TableContainer>}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Edit Flat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Box width="90%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
                        
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
                       
        </FormControl>
                    </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        {formData.name&&formData.age&&formData.gender&&formData.flat?<Button onClick={handleSubmit} variant='ghost'>Edit</Button>:<Button disabled onClick={handleSubmit} variant='ghost'>Edit</Button>}
                    </ModalFooter>
                    </ModalContent>
                </Modal>
        </div>
    )
}