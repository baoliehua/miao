import { combineReducers } from 'redux-immutable';
import {reducer as headerReducer} from '../common/header/store/'; 
//import  headerReducer from '../common/header/store/reducer'; 
const reducer =  combineReducers(
    {
        header: headerReducer,
    }
)

export default reducer;