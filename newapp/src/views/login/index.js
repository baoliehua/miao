import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link, withRouter } from 'react-router-dom'
import Icon from '../../components/icon'
import { actionCreators } from './store'
import {
  Logo,
  SignContainer,
  SignMain,
  SignTitle,
  SignInput,
  SignBtn
} from './style'

class Login extends PureComponent {
  render() {
    const {
      loginStatus,
      userLogin,
      recordedPathname
    } = this.props
    if (!loginStatus) {
      return (
        <SignContainer>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Logo></Logo>
          </Link>
          <SignMain>
            <SignTitle>一键登录 · 注册</SignTitle>
            <div className="user-wrapper">
              <Icon type="user"></Icon>
              <SignInput
                className="user"
                type="text"
                placeholder="用户名"
                ref={(node) => {this.userNode = node}}
              ></SignInput>
            </div>
            <div className="password-wrapper">
              <Icon type="password"></Icon>
              <SignInput
                className="password"
                type="password"
                placeholder="密码"
                ref={(node) => {this.passwordNode = node}}
              ></SignInput>
            </div>
            <SignBtn
              onClick={() => userLogin(this.userNode.value, this.passwordNode.value)}
            >登录</SignBtn>
          </SignMain>
        </SignContainer>
      )
    } else {
      return (
        <Redirect to={recordedPathname}></Redirect>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  loginStatus: state.getIn(['login', 'loginStatus']),
  recordedPathname: state.getIn(['views', 'recordedPathname'])
})

const mapDispatchToProps = (dispatch) => ({
  userLogin(user, password) {
    dispatch(actionCreators.userLoginAction(user, password))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))