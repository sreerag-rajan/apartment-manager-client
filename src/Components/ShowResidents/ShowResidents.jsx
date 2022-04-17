import { Divider } from "@chakra-ui/react"
import axios from "axios"
import { useEffect } from "react"
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
    const [flat, setFlat] = useState({})
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:2345/resident/flat/${id}`).then(({data})=>{
            setFlat(data);
        })
    },[])
    return(
        <div>
            {flat&&<TableContainer width="80%" margin="auto" marginTop="30px">
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
                            <Td> <Button colorScheme={"green"}>View</Button> </Td>
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