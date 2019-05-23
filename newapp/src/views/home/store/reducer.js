import { fromJS  } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  bannerList: [],
  bannerDisplayImgIndex: 1,
  bannerTotalDisplayImg: 0,
  recommendList: [],
  homeDisplayList: [],
  homeLoadingDataList: [],
  authorList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_HOME_DATA:
      return state.merge({
        homeDisplayList: action.homeDisplayList
      })
    case actionTypes.PROCESS_LOCAL_HOME_DATA:
      return state.merge({
        bannerList: action.bannerList,
        bannerTotalDisplayImg: action.bannerTotalDisplayImg,
        recommendList: action.recommendList
      })
    case actionTypes.GO_TO_IMG:
      return state.set('bannerDisplayImgIndex', action.gotoImgIndex)
    case actionTypes.PROCESS_LOADING_DATA:
      const homeLoadingDataList = state.get('homeLoadingDataList')
      return state.set('homeLoadingDataList', homeLoadingDataList.push(action.processData))
    default:
      return state
  }
}