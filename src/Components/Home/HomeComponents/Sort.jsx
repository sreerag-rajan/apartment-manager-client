import { Box, Select } from "@chakra-ui/react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { getFlats } from "../../../Redux/Flats/flat.action"


export const Sort = ()=>{
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        const {value} = e.target;
        axios.get(`https://apartment-manager-backend.herokuapp.com/flat?sort=${value}`).then(({data})=>{
            dispatch(getFlats(data));
        })
    }
    return(
        <div>
            <Select onChange={handleChange} id="sort" placeholder='Select Sort'>
                <option value='asc'>Flats in Ascending</option>
                <option value='desc'>Flats in Descending</option>
            </Select>

        </div>
    )
}