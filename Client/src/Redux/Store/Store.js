import { createStore } from "redux";
import allReducers from "../Reducers/Allreducers";

const store = createStore(allReducers);
export default store;
