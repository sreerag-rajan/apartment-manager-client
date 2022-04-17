import { Box, Button, Input } from '@chakra-ui/react'
import axios from 'axios';
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { getFlats } from '../../../Redux/Flats/flat.action';

export const Search = ()=>{
    const [q, setQ] = useState("");
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        setQ(e.target.value)
    }

    const handleSubmit = ()=>{
        axios.get(`http://localhost:2345/flat?q=${q}`).then(({data})=>{
            dispatch(getFlats(data));
        })
    }
    return (
        <Box width="30%" margin="auto" display="flex" gap="10px">
            <Input value={q} onChange={handleChange} placeholder='Search by Block'/>
            <Button onClick={handleSubmit}>Search</Button>
        </Box>
    )
}