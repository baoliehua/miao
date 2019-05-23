import * as constants from './constants';
import axios from 'axios';
import { fromJS } from 'immutable';

const changeLogin = (value) => ({
    type: constants.CHANGE_LOGIN,
    value: value,
})

export const login = (account,password) => {
    return (dispatch) => {
        axios.get('/api/login.json?account=' + account + 'password=' + password).then((res) =>{
            const result = res.data.data;
            if(result){
              dispatch(changeLogin(true));  
            }else{
                alert('登陆失败');
            }
        })
        
    }
}

export const logout = () => {
    return (dispatch) => {
        dispatch(changeLogin(false));
    }
}