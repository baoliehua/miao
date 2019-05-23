import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const processSearchTrendingDataAction = (articles) => {
  const searchTrendingData = articles.map((item) => ({
    id: item.pageid,
    title: item.title
  })).filter(item => item.title.length < 16)
  return {
    type: actionTypes.PROCESS_SEARCH_TRENDING_DATA,
    searchTrendingList: fromJS(searchTrendingData),
    searchTrendingTotalPages: Math.floor(searchTrendingData.length / 8)
  }
}

const processRelatedDataAction = (data) => {
  const searchRelatedList = Object.keys(data).map(key => ({
    id: data[key].pageid,
    title: data[key].title
  }))
  return {
    type: actionTypes.PROCESS_SEARCH_RELATED_DATA,
    searchRelatedList: fromJS(searchRelatedList)
  }
}

export const searchInputFocusAction = () => ({
  type: actionTypes.SEARCH_INPUT_FOCUS
})

export const searchInputBlurAction = () => ({
  type: actionTypes.SEARCH_INPUT_BLUR
})

export const toggleModeControllerStatusAction = (modeControllerShow) => ({
  type: actionTypes.MODE_CONTROLLER_STATUS,
  modeControllerShow: !modeControllerShow
})

export const hideModeControllerAction = () => ({
  type: actionTypes.HIDE_MODE_CONTROLLER
})

export const getSearchTrendingDataAction = () => {
  return (dispatch) => {
    const yyyy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1
    let dd = new Date().getDate() + ''
    dd = dd.length === 1 ? `0${dd}` : dd
    axios.get(`https://zh.wikipedia.org/api/rest_v1/feed/featured/${yyyy}/${mm}/${dd}`)
      .then((res) => {
        (res.status === 200) && dispatch(processSearchTrendingDataAction(res.data.mostread.articles))
      }).catch((ex) => {
        // console.log(ex)
      })
  }
}

export const searchTipsMouseEnterAction = () => ({
  type: actionTypes.SEARCH_TIPS_MOUSE_ENTER
})

export const searchTipsMouseLeaveAction = () => ({
  type: actionTypes.SEARCH_TIPS_MOUSE_LEAVE
})

export const searchTrendingCurrentPageAction = (currentPage, totalPage) => {
  let nextPage = (currentPage + 1) % totalPage
  return {
    type: actionTypes.SEARCH_TRENDING_CURRENT_PAGE,
    nextPage
}}

export const getRelatedDataAction = (keyword) => {
  return (dispatch) => {
    axios.get(`https://zh.m.wikipedia.org/w/api.php?origin=*&gpssearch=${keyword}&srsearch=${keyword || ''}&action=query&continue=&coprop=type|dim&format=json&generator=prefixsearch&gpslimit=24&gpsnamespace=0&list=search&pilimit=24&piprop=thumbnail&pithumbsize=120&prop=pageterms|pageimages|revisions|coordinates&redirects=1&rvprop=ids&srinfo=suggestion&srlimit=1&srnamespace=0&sroffset=0&srprop=&srwhat=text&wbptterms=description`)
      .then((res) => {
        let data = res.data.error ? {} : res.data.query.pages
        dispatch(processRelatedDataAction(data))
      }).catch((ex) => {
        // console.info(ex)
      })
  }
}

export const addSearchHistoryAction = (key, value) => ({
  type: actionTypes.ADD_SEARCH_HISTORY,
  key,
  value
})

export const deleteSearchHistoryAction = (key) => ({
  type: actionTypes.DELETE_SEARCH_HISTORY,
  key
})