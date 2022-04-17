import { GET_FLATS } from "./flat.action";

const initState = {
    flats:[]
}
export const flatReducer = (store = initState, {type, payload})=>{
    switch(type){
        case GET_FLATS:
            return {...store, flats:[...payload]}
        default:
            return store;
    }
}