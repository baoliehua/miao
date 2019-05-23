import * as constans from './constans';
import axios from 'axios';
import { fromJS } from 'immutable';

const getHomeData = (result) =>({
    type: constans.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    recommendList: result.recommendList,
})
export const getHomeInfo = () => {
    return (dispatch) => {
        axios.get('/api/home.json').then((res) => {
            const result = res.data.data;
            dispatch(getHomeData(result));
        })
    }
}

const addHomeList = (list,page) => ({
    type: constans.ADD_ARTICLE_LIST,
    list: list,
    nextpage: page + 1,
})

export const getMoreList = (page) => {
    console.log('act',page)
    return (dispatch) => {
        axios.get('./api/home.json?page=' + page).then((res) => {
            const result = res.data.data;
            dispatch(addHomeList(result,page));
        })
    }
}

const showScroll = (bool) => ({
    type: constans.SHOW_SCROLL,
    show: bool,
})
export const toggleTopShow = (boolean) => {
    return (dispatch) => {
        dispatch(showScroll(boolean));
    };
}
