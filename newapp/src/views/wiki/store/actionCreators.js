import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const processWikiDataAction = (data) => {
  let processData = fromJS({
    title: data.title,
    id: data.pageid,
    extract: data.extract,
    description: data.description,
    timestamp: data.timestamp,
    thumbnail: data.thumbnail
  })
  return {
    type: actionTypes.PROCESS_WIKI_DATA,
    processData
  }
}
export const getWikiDataAction = (title) => {
  return (dispatch) => {
    axios.get(`https://zh.wikipedia.org/api/rest_v1/page/summary/${title}`)
      .then((res) => {
        (res.status === 200) && dispatch(processWikiDataAction(res.data))
      }).catch((ex) => {
        // console.info(ex)
      })
  }
}