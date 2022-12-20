import { combineReducers } from "redux";
import employeesReducers from "./reducer";

const rootReducer = combineReducers({
  data: employeesReducers,
});

export default rootReducer;
