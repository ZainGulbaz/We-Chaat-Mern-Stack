import { combineReducers } from "redux";
import progressReducer from "./Progress";

const allReducers = combineReducers({ progressReducer });

export default allReducers;
