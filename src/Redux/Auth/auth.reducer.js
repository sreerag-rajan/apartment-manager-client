import { SET_USER } from "./auth.action";

const initState = {
    auth:null
}

export const authReducer = (store = initState, {type,payload})=>{
    switch(type){
        case SET_USER:
            return {...store, user:payload}
        default:
            return store;
    }
}