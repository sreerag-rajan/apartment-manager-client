
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
  } from '@chakra-ui/react'


export const ShowResidents = ()=>{
    const [residents, setresidents] = useState([])
    const [flat, setFlat] = useState("")
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:2345/resident/flat/${id}`).then(({data})=>{
            console.log(data);
            setresidents(data);
            let x = `${data[0].flat.block} ${data[0].flat.number}` 
            setFlat(x); 
        })
    },[])
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
                            <Td> <Button colorScheme={"yellow"}>Edit</Button> </Td>
                            <Td> <Button colorScheme={"red"}>Delete</Button> </Td>
                        </Tr>
                        })}
                    
                    </Tbody>
                </Table>
                </TableContainer>}
        </div>
    )
}