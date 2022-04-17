import axios from "axios";

export const GET_FLATS = "GET_FLATS"


export const getFlats = (payload) => ({type: GET_FLATS, payload});



export const getFlatsData = ()=>(dispatch)=>{
    axios.get("https://apartment-manager-backend.herokuapp.com/flat").then(({data})=>{
        dispatch(getFlats(data));
    })
}

export const addFlat = (payload)=>(dispatch)=>{
    axios.post("https://apartment-manager-backend.herokuapp.com/flat", payload).then(()=>{
        dispatch(getFlatsData());
    })
}

export const deleteFlat = (payload)=>(dispatch)=>{
    axios.delete(`https://apartment-manager-backend.herokuapp.com/flat/${payload}`).then(()=>{
        dispatch(getFlatsData())
    })
}
