import { enableMapSet } from "immer";
import { applyMiddleware, combineReducers } from "redux";
import profileSlice from '../reducers/profileSlice'

enableMapSet()

export default combineReducers({profileSlice})