import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { authReducer } from "./Auth/auth.reducer";
import { flatReducer } from "./Flats/flat.reducer";
import { residentReducer } from "./Residents/resident.reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    flats: flatReducer,
    residents: residentReducer
})

const loggerMiddleware = (store)=>(next)=>(action)=>{
    if(typeof action === "function"){
        return action(store.dispatch)
    }
    
    next (action);
}

export const store = createStore(rootReducer, compose(applyMiddleware(loggerMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))