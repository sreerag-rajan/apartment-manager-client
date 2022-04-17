import axios from "axios";

export const GET_FLATS = "GET_FLATS"


export const getFlats = (payload) => ({type: GET_FLATS, payload});



export const getFlatsData = ()=>(dispatch)=>{
    axios.get("http://localhost:2345/flat").then(({data})=>{
        dispatch(getFlats(data));
    })
}

export const addFlat = (payload)=>(dispatch)=>{
    axios.post("http://localhost:2345/flat", payload).then(()=>{
        dispatch(getFlatsData());
    })
}