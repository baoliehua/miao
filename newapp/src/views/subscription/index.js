import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect, withRouter } from 'react-router-dom'
import Icon from '../../components/icon'
import { actionCreators } from './store'
import { actionCreators as viewsActionCreators } from '../store'
import {
  SubContrainer,
  SubItem,
  SubItemTag,
  SubItemContent,
  SubItemImg,
  SubItemInfo,
  SubItemTitle,
  SubItemIntroduction,
  SubItemBtn
} from './style'

class Subscription extends PureComponent {
  render() {
    const {
      subList,
      loginStatus,
      subscribeItem,
      unsubscribeItem
    } = this.props
    if (loginStatus) {
      return (
        <SubContrainer>
          <ul>
            {
              subList.map((item, index) => (
                <SubItem key={item.get('id')}>
                  <SubItemTag>
                    <Icon type="medal"></Icon>
                    <span>简书推荐专题</span>
                  </SubItemTag>
                  <SubItemContent>
                    <Link to={`${process.env.PUBLIC_URL}/collection/${item.get('title')}`}>
                      <SubItemImg src={item.get('imgUrl')}></SubItemImg>
                    </Link>
                    <SubItemInfo>
                      <Link to={`${process.env.PUBLIC_URL}/collection/${item.get('title')}`}>
                        <SubItemTitle>{item.get('title')}</SubItemTitle>
                      </Link>
                      <SubItemIntroduction>{item.get('introduction')}</SubItemIntroduction>
                      <SubItemIntroduction>
                        <Icon type="grid"></Icon>
                        <span>{item.get('info')}</span>
                      </SubItemIntroduction>
                    </SubItemInfo>
                    {
                      item.get('subscribed')
                        ? (
                            <SubItemBtn
                              className="subscribed"
                              onClick={() => {unsubscribeItem(index)}}
                            >
                              <Icon type="selected"></Icon>
                              <span>已订阅</span>
                            </SubItemBtn>
                          )
                        : (
                            <SubItemBtn onClick={() => {subscribeItem(index)}}>
                              <Icon type="add"></Icon>
                              <span>订阅</span>
                            </SubItemBtn>
                          )
                    }
                  </SubItemContent>
                </SubItem>
              ))
            }
          </ul>
        </SubContrainer>
      )
    } else {
      return <Redirect to={`${process.env.PUBLIC_URL}/login`}></Redirect>
    }
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
      subList,
      getSubData
    } = this.props
    ;(subList.size === 0) && getSubData()
  }
  goLogin() {
    this.props.history.push('/login')
  }
}

const mapStateToProps = (state) => ({
  subList: state.getIn(['sub', 'subList']),
  loginStatus: state.getIn(['login', 'loginStatus'])
})

const mapDispatchToProps = (dispatch) => ({
  getSubData() {
    dispatch(actionCreators.getSubDataAction())
  },
  subscribeItem(index) {
    dispatch(actionCreators.subscribeItemAction(index))
  },
  unsubscribeItem(index) {
    dispatch(actionCreators.unsubscribeItemAction(index))
  },
  recordPath(pathname) {
    dispatch(viewsActionCreators.recordPathAction(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Subscription))