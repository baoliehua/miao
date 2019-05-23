import * as constans from './constans';
import axios from 'axios';
import { fromJS } from 'immutable';

const changeDetail = (title, content) => ({
    type: constans.CHANGE_DETAIL,
    title: title,
    content: content,
})

export const getDetail = (id) => {
    return (dispatch) => {
        axios.get('/api/detail.json?id=' + id).then((res) => {
            const result = res.data.data;
            dispatch(changeDetail(result.title,result.content))
        });
    }
}
