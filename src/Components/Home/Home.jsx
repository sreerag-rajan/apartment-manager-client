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
  } from '@chakra-ui/react'


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

    useEffect(()=>{
        dispatch(getFlatsData())
    },[])


    return(
        <div>
            <h1>Hello {user.username}</h1>
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
                            return <Tr>
                            <Td>{el.residentType}</Td>
                            <Td>{el.block}</Td>
                            <Td>{el.number}</Td>
                            <Td>{el.numberOfResidents}</Td>
                            <Td> <Button colorScheme={"green"}>View</Button> </Td>
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