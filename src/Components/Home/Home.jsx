import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import { getFlatsData } from "../../Redux/Flats/flat.action";
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
  } from '@chakra-ui/react'
import { Search } from "./HomeComponents/Search";
import { Sort } from "./HomeComponents/Sort";
import { Filter } from "./HomeComponents/Filter";
import { useNavigate } from "react-router-dom";


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

    useEffect(()=>{
        dispatch(getFlatsData())
    },[])

    const handleNavigate = (id)=>{
        console.log(id)
        navigate(`/flat/${id}`)
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
                            <Td> <Button colorScheme={"yellow"}>Edit</Button> </Td>
                            <Td> <Button colorScheme={"red"}>Delete</Button> </Td>
                        </Tr>
                        })}
                    
                    </Tbody>
                </Table>
                </TableContainer>
        </div>
    )
}