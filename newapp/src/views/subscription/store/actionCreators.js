import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const processSubDataAction = (data) => ({
  type: actionTypes.PROCESS_SUB_DATA,
  subList: fromJS(data.subList)
})

export const getSubDataAction = () => {
  return (dispatch) => {
    axios.get('https://easy-mock.com/mock/5bd12790049a962efbab9f60/api/subdata#!method=get')
      .then((res) => {
        (res.status === 200) && dispatch(processSubDataAction(res.data))
      }).catch((ex) => {
        // console.log(ex)
      })
  }
}

export const subscribeItemAction = (index) => ({
  type: actionTypes.SUBSCRIBE_ITEM,
  index
})

export const unsubscribeItemAction = (index) => ({
  type: actionTypes.UNSUBSCRIBE_ITEM,
  index
})