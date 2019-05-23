import React, { PureComponent, createRef, Fragment } from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CSSTransition } from 'react-transition-group'
import { actionCreators } from './store'
import { actionCreators as loginActionCreators } from '../login/store'
import Icon from '../../components/icon'
import Avatar from '../../assets/img/14297876570003.jpg'
import {
  Container,
  Content,
  Logo,
  NavBar,
  NavTab,
  NavSearchWrapper,
  NavSearchInput,
  NavSearchBtn,
  SearchTips,
  SearchTrending,
  SearchTrendingHeader,
  SearchTrendingToggle,
  SearchTrendingTagWrap,
  SearchRecent,
  SearchRecentItmeWrap,
  SearchRecentItemPart,
  StatusBar,
  StatusItem,
  ModeController,
  ModeControllerBtn,
  SearchRelated,
  UserInfo,
  UserAvatar,
  UserMenu
} from './style'

class Header extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchInputVal: ''
    }
    const { getRelatedData } = this.props
    this.getRelatedDataEvent = this.getRelatedDataEvent.bind(this)
    this.throttleGetRelatedData = this.throttle(getRelatedData, 600)
  }
  render() {
    const {
      isNighttime,
      searchInputFocused,
      modeControllerShow,
      changeTimeStatus,
      searchTrendingList,
      loginStatus,
      activePath,
      // methods
      searchInputOnFocus,
      searchInputOnBlur,
      toggleModeControllerStatus,
      userLogout
    } = this.props
    const { searchInputVal } = this.state
    return (
      <Container data-avtive-path={activePath}>
        <Content>
          <Link to={`${process.env.PUBLIC_URL}/`}>
            <Logo></Logo>
          </Link>
          <NavBar>
            <NavLink
              to={`${process.env.PUBLIC_URL}/`}
              activeClassName="selected"
              exact
            >
              <NavTab>
                <Icon type="compass"></Icon>
                发现
              </NavTab>
            </NavLink>
            <NavLink
              to={`${process.env.PUBLIC_URL}/subscription`}
              activeClassName="selected"
              exact
            >
              <NavTab>
                <Icon type="read"></Icon>
                关注
              </NavTab>
            </NavLink>
            <NavSearchWrapper>
              <CSSTransition
                in={searchInputFocused}
                timeout={300}
                classNames="slide"
              >
                <NavSearchInput
                  className={searchInputFocused ? 'focused' : ''}
                  onFocus={() => {searchInputOnFocus(searchTrendingList)}}
                  onBlur={searchInputOnBlur}
                  onChange={this.getRelatedDataEvent}
                  value={searchInputVal}
                ></NavSearchInput>
              </CSSTransition>
              <CSSTransition
                in={searchInputFocused}
                timeout={300}
                classNames="discolor"
              >
                <NavSearchBtn className={searchInputFocused ? 'focused' : ''}>
                  <Icon type="search"></Icon>
                </NavSearchBtn>
              </CSSTransition>
              {this.showSearchTips()}
            </NavSearchWrapper>
            <NavTab
              className="style-mode"
              onClick={() => {toggleModeControllerStatus(modeControllerShow)}}
            >
              Aa
              <CSSTransition
                in={modeControllerShow}
                timeout={300}
                classNames="fade"
              >
                <ModeController
                  className={modeControllerShow ? 'show' : ''}
                >
                  <div className="btn-wrapper">
                    <ModeControllerBtn
                      className={isNighttime ? 'active' : ''}
                      onClick={() => changeTimeStatus(true)}
                    >开</ModeControllerBtn>
                    <ModeControllerBtn
                      className={isNighttime ? '' : 'active'}
                      onClick={() => changeTimeStatus(false)}
                    >关</ModeControllerBtn>
                  </div>
                  <div className={`mode-info ${isNighttime ? 'active' : ''}`}>
                    <Icon type="moon"></Icon>
                    <span>夜间模式</span>
                  </div>
                </ModeController>
              </CSSTransition>
            </NavTab>
          </NavBar>
          <StatusBar>
            {
              loginStatus === false
                ? (
                  <Fragment>
                    <Link to={`${process.env.PUBLIC_URL}/login`}>
                      <StatusItem className="sign-up">注册</StatusItem>
                    </Link>
                    <Link to={`${process.env.PUBLIC_URL}/login`}>
                      <StatusItem className="log-in">登录</StatusItem>
                    </Link>
                  </Fragment>
                )
                : (
                  <UserInfo>
                    <UserAvatar src={Avatar}></UserAvatar>
                    <UserMenu>
                      <div onClick={userLogout}>
                        <Icon type="signout"></Icon>
                        <span>退出</span>
                      </div>
                    </UserMenu>
                  </UserInfo>
                )
            }
          </StatusBar>
        </Content>
      </Container>
    )
  }
  componentDidMount() {
    const { hideModeController } = this.props
    document.body.addEventListener('click', (e) => {
      let node = e.target
      let matched = false
      while (!matched && !node.matches('#root')) {
        matched = node.matches('.style-mode')
        node = node.parentNode
      }
      if (!matched) {
        hideModeController()
      }
    })
  }
  componentDidUpdate() {
    const {
      searchInputFocused,
      searchTipsMouseEnter
    } = this.props
    if (!searchInputFocused && !searchTipsMouseEnter) {
      this.setState({ searchInputVal: '' })
      this.throttleGetRelatedData('')
    }
  }
  showSearchTips() {
    const {
      searchInputFocused,
      searchTipsMouseEnter,
      searchTrendingList,
      searchTrendingCurrentPage,
      searchTrendingTotalPages,
      searchRelatedList,
      searchHistoryList,
      // methods
      searchTipsOnMouseEnter,
      searchTipsOnMouseLeave,
      changeSearchTrendingCurrentPage,
      addSearchHistory,
      deleteSearchHistory
    } = this.props
    const SearchTrendingToggleIconRef = createRef()
    const originSearchHistory = searchHistoryList.toJS()
    const originSearchHistoryKey = Object.keys(originSearchHistory)
    if (searchInputFocused || searchTipsMouseEnter) {
      const startItemIndex = searchTrendingCurrentPage * 8
      const searchTrendingDisplayList = searchTrendingList.slice(startItemIndex, startItemIndex + 8)
      return (
        <SearchTips
          onMouseEnter={searchTipsOnMouseEnter}
          onMouseLeave={searchTipsOnMouseLeave}
        >
          <SearchTrending>
            <SearchTrendingHeader>
              <span>热门搜索</span>
              <SearchTrendingToggle
                onClick={
                  () => {changeSearchTrendingCurrentPage(searchTrendingCurrentPage, searchTrendingTotalPages, SearchTrendingToggleIconRef)}
                }
              >
                <Icon type="refresh" ref={SearchTrendingToggleIconRef}></Icon>
                换一批
              </SearchTrendingToggle>
            </SearchTrendingHeader>
            <SearchTrendingTagWrap>
              {
                searchTrendingDisplayList.map(item => {
                  return (
                    <li key={item.get('id')}>
                      <Link to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}>
                        {item.get('title')}
                      </Link>
                    </li>
                  )
                })
              }
            </SearchTrendingTagWrap>
          </SearchTrending>
          {
            originSearchHistoryKey.length === 0
              ? null
              : (
                <SearchRecent>
                  <SearchRecentItmeWrap>
                    {
                      originSearchHistoryKey.map(key => (
                        <li key={key}>
                          <Link to={`${process.env.PUBLIC_URL}/wiki/${originSearchHistory[key]}`}>
                            <SearchRecentItemPart className="icon-search-history">
                              <Icon type="history"></Icon>
                            </SearchRecentItemPart>
                            <SearchRecentItemPart className="recent-title">
                              {originSearchHistory[key]}
                            </SearchRecentItemPart>
                            <SearchRecentItemPart
                              className="icon-unfollow"
                              onClick={(e) => {deleteSearchHistory(e, key)}}
                            >
                              <Icon type="delete"></Icon>
                            </SearchRecentItemPart>
                          </Link>
                        </li>
                      ))
                    }
                  </SearchRecentItmeWrap>
                </SearchRecent>
              )
          }
          {
            searchRelatedList.size === 0
              ? null
              : (
                <SearchRelated>
                  {
                    searchRelatedList
                      .filter(item => !item.get('title').includes('%'))
                      .map(item => {
                        return (
                          <Link
                            to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}
                            key={item.get('id')}
                            onClick={() => {addSearchHistory(item.get('id'), item.get('title'))}}
                          >
                            {item.get('title')}
                          </Link>
                        )
                      })
                  }
                </SearchRelated>
              )
          }
        </SearchTips>
      )
    }
  }
  getRelatedDataEvent(e) {
    const {value: keyword } = e.target
    this.setState({ searchInputVal: keyword })
    this.throttleGetRelatedData(keyword)
  }
  throttle(func, wait = 0, options = {}) {
    // Specify invoking on the leading edge of the timeout.
    let {
      leading = true
    } = options
    // Specify invoking on the trailing edge of the timeout.
    let {
      trailing = true
    } = options
    let previous = 0
    let timeoutID = null
    let result
    let context
    let lastArgs

    return function (...args) {
      let runtime = Date.now()
      context = this
      lastArgs = args
      if (previous === 0 && leading === false) {
        previous = runtime
      }
      // 需要等待多长时间后可以执行
      let remaining = wait - (runtime - previous)
      // remaining > wait 说明时间被调整过
      if (remaining <= 0 || remaining > wait) {
        if (timeoutID) {
          clearTimeout(timeoutID)
          timeoutID = null
        }
        previous = runtime
        result = func.call(context, ...lastArgs)
      } else if (!timeoutID && trailing !== false) {
        timeoutID = setTimeout(() => {
          //leading 为false时,每次触发后一定会延迟wait时间才会调用,如果不把previous重置
          //为0,那么中间间隔长时间remaining就会变为负数,下一次调用就会马上触发,不会延迟
          previous = leading === false ? 0 : Date.now()
          timeoutID = null
          result = func.call(context, ...lastArgs)
        }, remaining)
      }
      return result
    }
  }
}

const mapStateToProps = (state) => ({
  searchInputFocused: state.getIn(['header', 'searchInputFocused']),
  searchTipsMouseEnter: state.getIn(['header', 'searchTipsMouseEnter']),
  modeControllerShow: state.getIn(['header', 'modeControllerShow']),
  searchTrendingList: state.getIn(['header', 'searchTrendingList']),
  searchTrendingTotalPages: state.getIn(['header', 'searchTrendingTotalPages']),
  searchTrendingCurrentPage: state.getIn(['header', 'searchTrendingCurrentPage']),
  searchRelatedList: state.getIn(['header', 'searchRelatedList']),
  searchHistoryList: state.getIn(['header', 'searchHistoryList']),
  activePath: state.getIn(['views', 'activePath']),
  loginStatus: state.getIn(['login', 'loginStatus'])
})

const mapDispatchToProps = (dispatch) => ({
  searchInputOnFocus(searchTrendingList) {
    (searchTrendingList.size === 0) && dispatch(actionCreators.getSearchTrendingDataAction())
    dispatch(actionCreators.searchInputFocusAction())
  },
  searchInputOnBlur() {
    dispatch(actionCreators.searchInputBlurAction())
  },
  toggleModeControllerStatus(modeControllerShow) {
    dispatch(actionCreators.toggleModeControllerStatusAction(modeControllerShow))
  },
  hideModeController() {
    dispatch(actionCreators.hideModeControllerAction())
  },
  searchTipsOnMouseEnter() {
    dispatch(actionCreators.searchTipsMouseEnterAction())
  },
  searchTipsOnMouseLeave() {
    dispatch(actionCreators.searchTipsMouseLeaveAction())
  },
  changeSearchTrendingCurrentPage(currentPage, totalPage, SearchTrendingToggleIconRef) {
    const iconNode = SearchTrendingToggleIconRef.current
    const iconNodeTransform = iconNode.style.transform
    const originAngle = iconNodeTransform ? Number(iconNodeTransform.match(/\d+/)[0]) : 0
    iconNode.style.transform = `rotate(${originAngle + 360}deg)`
    dispatch(actionCreators.searchTrendingCurrentPageAction(currentPage, totalPage))
  },
  getRelatedData(keyword) {
    dispatch(actionCreators.getRelatedDataAction(keyword))
  },
  addSearchHistory(key, value) {
    dispatch(actionCreators.addSearchHistoryAction(key, value))
  },
  deleteSearchHistory(e, key) {
    e.stopPropagation()
    e.preventDefault()
    dispatch(actionCreators.deleteSearchHistoryAction(key))
  },
  userLogout() {
    dispatch(loginActionCreators.userLogoutAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header))
