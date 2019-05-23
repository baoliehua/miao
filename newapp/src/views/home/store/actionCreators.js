import axios from 'axios'
import { fromJS } from 'immutable'
import * as actionTypes from './actionTypes'

const processHomeDataAction = (articles) => {
  let homeDataList = articles.map((item) => ({
    id: item.pageid,
    title: item.title,
    extract: item.extract,
    thumbnail: item.thumbnail,
    timestamp: item.timestamp
  }))
  return {
    type: actionTypes.PROCESS_HOME_DATA,
    homeDisplayList: fromJS(homeDataList),
    searchTrendingTotalPages: Math.floor(homeDataList.length / 8)
  }
}

const processHomeLocalDataAction = (data) => ({
  type: actionTypes.PROCESS_LOCAL_HOME_DATA,
  bannerList: fromJS(data.bannerList),
  bannerTotalDisplayImg: data.bannerList.length,
  recommendList: fromJS(data.recommendList)
})

const processLoadingDataAction = (data) => {
  let processData = fromJS({
    id: data.pageid,
    title: data.title,
    extract: data.extract,
    thumbnail: data.thumbnail,
    timestamp: data.timestamp
  })
  return {
    type: actionTypes.PROCESS_LOADING_DATA,
    processData
  }
}

export const getHomeDataAjaxAction = () => {
  return (dispatch) => {
    const yyyy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1
    let dd = new Date().getDate() + ''
    dd = dd.length === 1 ? `0${dd}` : dd
    axios.get(`https://zh.wikipedia.org/api/rest_v1/feed/featured/${yyyy}/${mm}/${dd}`)
      .then((res) => {
        (res.status === 200) && dispatch(processHomeDataAction(res.data.mostread.articles))
      }).catch((ex) => {
        // console.log(ex)
      })
  }
}

export const getHomeLocalDataAction = () => {
  return (dispatch) => {
    axios.get('https://easy-mock.com/mock/5bd12790049a962efbab9f60/api/homedata#!method=get')
      .then((res) => {
        (res.status === 200) && dispatch(processHomeLocalDataAction(res.data))
      }).catch((err) => {
      // console.log(err)
    })
  }
}

export const gotoPrevImgAction = (displayImgIndex, bannerTotalDisplayImg) => {
  const gotoImgIndex = (displayImgIndex + bannerTotalDisplayImg + 1) % (bannerTotalDisplayImg + 2)
  return {
    type: actionTypes.GO_TO_IMG,
    gotoImgIndex
  }
}

export const gotoNextImgAction = (displayImgIndex, bannerTotalDisplayImg) => {
  const gotoImgIndex = (displayImgIndex + bannerTotalDisplayImg + 3) % (bannerTotalDisplayImg + 2)
  return {
    type: actionTypes.GO_TO_IMG,
    gotoImgIndex
  }
}

export const gotoDesignatedImgAction = (gotoImgIndex) => ({
  type: actionTypes.GO_TO_IMG,
  gotoImgIndex
})

export const getMoreDisplayDataAction = () => {
  return (dispatch) => {
    for (let i = 0; i < 20; i++) {
      axios.get('https://zh.wikipedia.org/api/rest_v1/page/random/summary')
        .then((res) => {
          (res.status === 200) && dispatch(processLoadingDataAction(res.data))
        }).catch((ex) => {
          // console.info(ex)
        })
    }
  }
}