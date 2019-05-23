import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  subList: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_SUB_DATA:
      return state.set('subList', action.subList)
    case actionTypes.SUBSCRIBE_ITEM:
      return state.setIn(['subList', action.index, 'subscribed'], true)
    case actionTypes.UNSUBSCRIBE_ITEM:
      return state.setIn(['subList', action.index, 'subscribed'], false)
    default:
      return state
  }
}