import { fromJS  } from 'immutable'
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
  activePath: `${process.env.PUBLIC_URL}/`,
  recordedPathname: `${process.env.PUBLIC_URL}/`
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.PATH_CHANGE:
      return state.set('activePath', action.path)
    case actionTypes.RECORD_PATH:
      return state.set('recordedPathname', action.pathname)
    default:
      return state
  }
}