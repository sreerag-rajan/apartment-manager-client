import { GET_RESIDENTS } from "./resident.action";


const initState = {
    residents:[]
}
export const residentReducer = (store = initState, {type, payload})=>{
    switch(type){
        case GET_RESIDENTS:
            return {...store, residents:[...payload]}
        default:
            return store;
    }
}