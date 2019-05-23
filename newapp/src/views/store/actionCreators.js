import * as actionTypes from './actionTypes'

export const pathChangeAction = (path) => ({
  type: actionTypes.PATH_CHANGE,
  path
})

export const recordPathAction = (pathname) => ({
  type: actionTypes.RECORD_PATH,
  pathname
})