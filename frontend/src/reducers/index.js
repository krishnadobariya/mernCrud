import { combineReducers } from "redux";
import usersReducer from "./userReducers";

const rootReducer = combineReducers({ 
    user : usersReducer
});

export default rootReducer;