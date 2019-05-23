import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { actionCreators as viewsActionCreators } from '../store'
import Banner from './components/banner'
import Recommend from './components/recommend'
import Articles from './components/articles'
import Board from './components/board'
import Download from './components/download'
import {
  Container,
  Content,
  Main,
  Aside
} from './style'

class Home extends PureComponent {
  render() {
    return (
      <Container>
        <Content>
          <Main>
            <Banner></Banner>
            <Recommend></Recommend>
            <Articles></Articles>
          </Main>
          <Aside>
            <Board></Board>
            <Download></Download>
          </Aside>
        </Content>
      </Container>
    )
  }
  componentWillMount() {
    const {
      recordPath,
      location
    } = this.props
    recordPath(location.pathname)
  }
  componentDidMount() {
    const {
      homeDisplayList,
      bannerList,
      getHomeDisplayData,
      getHomeLocalData
    } = this.props
    ;(homeDisplayList.size === 0) && getHomeDisplayData()
    ;(bannerList.size === 0) && getHomeLocalData()
  }
}

const mapStateToProps = (state) => {
  return {
  homeDisplayList: state.getIn(['home', 'homeDisplayList']),
  bannerList: state.getIn(['home', 'bannerList'])
}}

const mapDispatchToProps = (dispatch) => ({
  getHomeDisplayData() {
    dispatch(actionCreators.getHomeDataAjaxAction())
  },
  getHomeLocalData() {
    dispatch(actionCreators.getHomeLocalDataAction())
  },
  recordPath(pathname) {
    dispatch(viewsActionCreators.recordPathAction(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))