import { fromJS } from 'immutable';
import * as constans from './constans';

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    recommondList:[],
    articlePage: 1,
    showScroll: false,
});


export default (state = defaultState, action) => {
    switch(action.type) {
        case constans.CHANGE_HOME_DATA: 
            console.log(action)
            return state.merge({
                topicList: fromJS(action.topicList),
                articleList: fromJS(action.articleList),
                recommondList: fromJS(action.recommendList),
            })
        ;
        case constans.ADD_ARTICLE_LIST: 
            console.log(action.nextpage)
            return state.merge({
                'articleList' : state.get('articleList').concat(fromJS(action.list.articleList)),
                'articlePage' : action.nextpage,
            });
        ;
        case constans.SHOW_SCROLL:
            return state.set('showScroll',action.show);
        ;
        default:
            return state;
    }
}