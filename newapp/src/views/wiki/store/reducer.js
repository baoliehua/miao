import { fromJS  } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  wikiData: {}
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_WIKI_DATA:
      return state.set('wikiData', action.processData)
    default:
      return state
  }
}