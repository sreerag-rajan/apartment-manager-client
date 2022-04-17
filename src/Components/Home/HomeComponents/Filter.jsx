import { Box, Select } from "@chakra-ui/react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getFlats } from "../../../Redux/Flats/flat.action"


export const Filter = ()=>{
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        const {value} = e.target;
        axios.get(`http://localhost:2345/flat?filter=${value}`).then(({data})=>{
            dispatch(getFlats(data));
        })
    }
    return(
        <div>
            <Select onChange={handleChange} id="filter" placeholder='Select Filter'>
                <option value='Owner'>Owner</option>
                <option value='Tenant'>Tenant</option>
            </Select>

        </div>
    )
}