import axios from "axios";

export const GET_RESIDENTS = "GET_RESIDENTS"


const getResidents = (payload) => ({type: GET_RESIDENTS, payload});



export const getResidentsData = (id)=>(dispatch)=>{
    axios.get(`http://localhost:2345/resident/flat/${id}`).then(({data})=>{
        dispatch(getResidents(data));
    })
}

export const addResident = (payload)=>(dispatch)=>{
    axios.post('http://localhost:2345/resident',payload).then((res)=>{
        console.log(res);
    })
}