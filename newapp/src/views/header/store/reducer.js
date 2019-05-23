import { fromJS  } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  searchInputFocused: false,
  searchTipsMouseEnter: false,
  modeControllerShow: false,
  searchTrendingList: [],
  searchTrendingCurrentPage: 0,
  searchTrendingTotalPages: 0,
  searchRelatedList: [],
  searchHistoryList: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.SEARCH_INPUT_FOCUS:
      return state.set('searchInputFocused', true)
    case actionTypes.SEARCH_INPUT_BLUR:
      return state.set('searchInputFocused', false)
    case actionTypes.MODE_CONTROLLER_STATUS:
      return state.set('modeControllerShow', action.modeControllerShow)
    case actionTypes.HIDE_MODE_CONTROLLER:
      return state.set('modeControllerShow', false)
    case actionTypes.SEARCH_TIPS_MOUSE_ENTER:
      return state.set('searchTipsMouseEnter', true)
    case actionTypes.SEARCH_TIPS_MOUSE_LEAVE:
      return state.set('searchTipsMouseEnter', false)
    case actionTypes.SEARCH_TRENDING_CURRENT_PAGE:
      return state.set('searchTrendingCurrentPage', action.nextPage)
    case actionTypes.PROCESS_SEARCH_TRENDING_DATA:
      return state.merge({
        searchTrendingList: action.searchTrendingList,
        searchTrendingTotalPages: action.searchTrendingTotalPages
      })
    case actionTypes.PROCESS_SEARCH_RELATED_DATA:
      return state.set('searchRelatedList', action.searchRelatedList)
    case actionTypes.ADD_SEARCH_HISTORY:
      return state.setIn(['searchHistoryList', action.key + ''], action.value)
    case actionTypes.DELETE_SEARCH_HISTORY:
      return state.removeIn(['searchHistoryList', action.key + ''])
    default:
      return state
  }
}