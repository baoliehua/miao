import { fromJS  } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  collectionData: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_COLLECTION_DATA:
      return state.set('collectionData', action.data)
    default:
      return state
  }
}