import { Button } from "@chakra-ui/react"
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlats, getFlatsData } from "../../../Redux/Flats/flat.action";


export const Pagination = ()=>{
    const [page, setPage] = useState(1);
    const flat = useSelector((store)=>store.flats.flats);
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getFlatsData())
    },[])

    const handleChange = (val)=>{
        if(page+val>0){
            setPage(page+val)
        let x = page+val;
        axios.get(`https://apartment-manager-backend.herokuapp.com/flat?page=${x}`).then(({data})=>{
            dispatch(getFlats(data));
        })
        }
        
    }
    return(
        <div>
            <Button margin="10px" onClick={()=>{handleChange(-1)}}>Previous</Button>
            <Button margin="10px" onClick={()=>{handleChange(1)}}>Next</Button>
        </div>
    )
}