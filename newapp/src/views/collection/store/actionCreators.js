import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const processCollectionDataAction = (data) => ({
  type: actionTypes.PROCESS_COLLECTION_DATA,
  data: fromJS(data)
})

export const getCollectionDataAction = (keyword) => {
  return (dispatch) => {
    axios.get(`https://zh.wikipedia.org/api/rest_v1/page/related/${keyword}`)
      .then((res) => {
        (res.status === 200) && dispatch(processCollectionDataAction(res.data.pages))
      })
  }
}