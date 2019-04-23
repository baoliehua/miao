import * as constants from './constants';
//immer 可以更好用
import { fromJS } from 'immutable';

const defaultState = fromJS({
    focused: false,
    list:[],
    page: 0,
    totalPage: 1,
    mouseEnter: false,
});

export default (state = defaultState,action) =>{
    if (action.type === constants.SEARCH_FOCUS){
        return state.set("focused",true);
    }
    if (action.type === constants.SEARCH_BLUR){
        return state.set("focused",false);
    }
    if(action.type === constants.CHANGE_LIST){
        //console.log(action.data);
        return state.set("list",action.data).set("totalPage",action.totalPage);
    }
    if(action.type === constants.MOUSE_ENTER){
        return state.set("mouseEnter",true)
    }
    if(action.type === constants.MOUSE_LEAVE){
        return state.set("mouseEnter",false)
    }
    if(action.type === constants.SWITCH_ITEM){
        if(state.get("page") < 4){
            return state.set("page",state.get("page") + 1);
        }else{
            return state.set("page",0)
        }
    }
    return state;
}
