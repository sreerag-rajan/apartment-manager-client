import axios from "axios";

export const GET_RESIDENTS = "GET_RESIDENTS"


const getResidents = (payload) => ({type: GET_RESIDENTS, payload});



export const getResidentsData = (id)=>(dispatch)=>{
    axios.get(`https://apartment-manager-backend.herokuapp.com/resident/flat/${id}`).then(({data})=>{
        dispatch(getResidents(data));
    })
}

export const addResident = (payload)=>(dispatch)=>{
    axios.post('https://apartment-manager-backend.herokuapp.com/resident',payload).then((res)=>{
        console.log(res);
    })
}

export const deleteResident = (residentId, flatId)=>(dispatch)=>{
    
    axios.delete(`https://apartment-manager-backend.herokuapp.com/resident/${residentId}`).then(()=>{
        dispatch(getResidentsData(flatId))
    })
}