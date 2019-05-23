import * as actionTypes from './actionTypes'
import axios from 'axios'

const changeLoginStatusAction = (loginStatus) => ({
  type: actionTypes.CHANGE_LOGIN_STATUS,
  loginStatus
})

export const userLoginAction = (user, password) => {
  return (dispatch) => {
    axios.post(`https://easy-mock.com/mock/5bd12790049a962efbab9f60/api/logindata#!method=post?user=${user}&password=${password}`)
      .then((res) => {
        (res.status === 200) && (res.data.success === true) && dispatch(changeLoginStatusAction(res.data.loginStatus))
      }).catch((ex) => {
        // console.info(ex)
      })
  }
}

export const userLogoutAction = () => {
  return (dispatch) => {
    dispatch(changeLoginStatusAction(false))
  }
}