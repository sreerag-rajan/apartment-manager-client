import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { deleteFlat, getFlatsData } from "../../Redux/Flats/flat.action";
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
import { Search } from "./HomeComponents/Search";
import { Sort } from "./HomeComponents/Sort";
import { Filter } from "./HomeComponents/Filter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Pagination } from "./HomeComponents/Pagination";


export const Home = ()=>{
    const user = useSelector((store)=>store.auth.user);
    return (
        <div>
        {!user?<HomeNoUser/>:<HomeWithUser user={user}/>}
        </div>
    )
}



const HomeNoUser = ()=>{
    return(
        <div>
            <h1>Welcome User!</h1>
            <p>You have not logged in. Please login to access flat and resident details</p>
        </div>
    )
}

const HomeWithUser = ({user})=>{
    const flats = useSelector((store)=>store.flats.flats)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [editFlat, setEditFlat] = useState({})

    useEffect(()=>{
        dispatch(getFlatsData())
    },[])

    const handleNavigate = (id)=>{
        console.log(id)
        navigate(`/flat/${id}`)
    }

    const handleDelete = (id)=>{
        dispatch(deleteFlat(id))
    }


    //For edit purposes
    const openModal = (flat)=>{
        console.log(flat)
        setEditFlat(flat)
        onOpen();
    }
    const [formData, setFormData] = useState({
        residentType: editFlat.residentType,
        block: editFlat.block,
        number: editFlat.number,
        numberOfResidents: editFlat.numberOfResidents,
        createdUser : editFlat.createdUser   
    })
    useEffect(()=>{
        setFormData({
            residentType: editFlat.residentType,
            block: editFlat.block,
            number: editFlat.number,
            numberOfResidents: editFlat.numberOfResidents,
            createdUser : editFlat.createdUser  
        })
    },[editFlat])

    const handleChange = (e)=>{
        const {id, value} = e.target
        setFormData({...formData, [id]:value});
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        axios.patch(`http://localhost:2345/flat/${editFlat._id}`, formData).then(()=>{
            dispatch(getFlatsData());
        })
        onClose();
        setFormData({
            residentType: editFlat.residentType,
            block: editFlat.block,
            number: editFlat.number,
            numberOfResidents: editFlat.numberOfResidents,
            createdUser : editFlat.createdUser   
        })
    }





    return(
        <div>
            <h1>Hello {user.username}</h1>
            <Search/>
            <Box display="flex" justifyContent="center" gap="20px" margin="20px" >
            <Sort/>
            <Filter/>
            </Box>
            
            <TableContainer width="80%" margin="auto" marginTop="30px">
                <Table variant='striped'>
                    <Thead border="2px solid teal">
                    <Tr>
                        <Th>Type</Th>
                        <Th>Block</Th>
                        <Th>Number</Th>
                        <Th># of Residents</Th>
                        <Th>View</Th>
                        <Th>Edit</Th>
                        <Th>Delete</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                        {flats.map((el)=>{
                            return <Tr key={el._id}>
                            <Td>{el.residentType}</Td>
                            <Td>{el.block}</Td>
                            <Td>{el.number}</Td>
                            <Td>{el.numberOfResidents}</Td>
                            <Td> <Button onClick={()=>{
                                handleNavigate(el._id)
                            }} colorScheme={"green"}>View</Button> </Td>
                            <Td> <Button onClick={()=>{openModal(el)}} colorScheme={"yellow"}>Edit</Button> </Td>
                            <Td> <Button onClick={()=>{handleDelete(el._id)}} colorScheme={"red"}>Delete</Button> </Td>
                        </Tr>
                        })}
                    
                    </Tbody>
                </Table>
                </TableContainer>

                <Pagination/>


                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>Edit Flat</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Box width="90%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
                        
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
                        
                    </FormControl>
                    </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                        </Button>
                        {formData.residentType&&formData.block&&formData.number?<Button onClick={handleSubmit} variant='ghost'>Edit</Button>:<Button disabled onClick={handleSubmit} variant='ghost'>Edit</Button>}
                    </ModalFooter>
                    </ModalContent>
                </Modal>
        </div>
    )
}



// const EditForm = (flat)=>{
//     const user = useSelector((store)=>store.auth.user);
//     const dispatch = useDispatch()
    

//     const [formData, setFormData] = useState({
//         residentType: flat.residentType,
//         block: flat.block,
//         number: flat.number,
//         numberOfResidents: flat.numberOfResidents,
//         createdUser : flat.createdUser   
//     })

//     const handleChange = (e)=>{
//         const {id, value} = e.target
//         setFormData({...formData, [id]:value});
//     }

//     const handleSubmit= (e)=>{
//         e.preventDefault();
//         axios.patch(`http://localhost:2345/flat/${flat._id}`, formData).then(()=>{
//             dispatch(getFlatsData());
//         })
//         setFormData({
//             residentType: flat.residentType,
//             block: flat.block,
//             number: flat.number,
//             numberOfResidents: flat.numberOfResidents,
//             createdUser : flat.createdUser   
//         })
//     }
//     // if(!user){
//     //     return <Navigate to="/login"/>
//     // }
    
//     return (
//         <Box width="90%" margin="auto" marginTop="40px" border="3px solid teal" padding="20px" borderRadius="30px">
//             <h1>Add A Flat</h1>
//         <FormControl >
//             <FormLabel  htmlFor='residentType'>Type</FormLabel>
//             <Select value={formData.residentType} id="residentType" placeholder='Select option'>
//                 <option value='Owner'>Owner</option>
//                 <option value='Tenant'>Tenant</option>
//             </Select>
//             <FormLabel htmlFor='block'>Block</FormLabel>
//             <Input onChange={handleChange} value={formData.block} id='block' type='text' placeholder="Block: A,B,C..." />
//             <FormLabel htmlFor='number'>Number</FormLabel>
//             <Input onChange={handleChange} value={formData.number} id='number' type='number' placeholder="House Number" />
//             {formData.residentType&&formData.block&&formData.number?<Button colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Flat</Button>:<Button disabled colorScheme={"teal"} onClick={handleSubmit} marginTop="10px">Add Flat</Button>  }           
//         </FormControl>
//         </Box>
//     )
// }