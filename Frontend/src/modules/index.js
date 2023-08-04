import { combineReducers } from "redux";
import { loginReducer } from "../store/LoginUser";

const rootReducer = combineReducers({loginReducer});

export default rootReducer;