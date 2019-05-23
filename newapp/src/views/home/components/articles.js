import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreators } from '../store'
import {
  ArticlesContainer,
  ArticlesItem,
  ItemImg,
  ItemExtract,
  LoadMoreTitle,
  LoadMoreExtract,
  ItemTime,
  LoadMoreExtractPart,
  LoadMoreImg
} from '../style'

class Articles extends PureComponent {
  constructor(props) {
    super(props)
    const {
      getMoreDisplayData
    } = this.props
    this.throttleGetMoreDisplayData = this.throttle(getMoreDisplayData, 2000, { trailing: false })
    this.getMoreDisplayDataEvent = this.getMoreDisplayDataEvent.bind(this)
  }
  render() {
    const {
      homeDisplayList,
      homeLoadingDataList
    } = this.props
    const allDisplayDataList = homeDisplayList
      .concat(homeLoadingDataList)
      .filter(item => (
        item.get('thumbnail') && Math.abs(item.getIn(['thumbnail', 'width']) - item.getIn(['thumbnail', 'height'])) < 100
      ))
    return (
      <ArticlesContainer>
        {
          allDisplayDataList.map(item => (
            <ArticlesItem key={item.get('id')}>
              <Link
                to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}
                className="title"
              >
                {item.get('title')}
              </Link>
              <ItemExtract>{item.get('extract')}</ItemExtract>
              <ItemTime>{item.get('timestamp')}</ItemTime>
              <Link to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}>
                <ItemImg src={item.getIn(['thumbnail', 'source'])}></ItemImg>
              </Link>
            </ArticlesItem>
          ))
        }
        <ArticlesItem>
          <LoadMoreTitle></LoadMoreTitle>
          <LoadMoreExtract>
            <LoadMoreExtractPart></LoadMoreExtractPart>
            <LoadMoreExtractPart></LoadMoreExtractPart>
            <LoadMoreExtractPart></LoadMoreExtractPart>
          </LoadMoreExtract>
          <LoadMoreImg></LoadMoreImg>
        </ArticlesItem>
      </ArticlesContainer>
    )
  }
  componentDidMount() {
    window.addEventListener('scroll', this.getMoreDisplayDataEvent)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.getMoreDisplayDataEvent)
  }
  getMoreDisplayDataEvent() {
    if(this.scrollAtBottm()) {
      this.throttleGetMoreDisplayData()
    }
  }
  scrollAtBottm() {
    function _getScrollTop() {
      let scrollTop = 0
      if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
      } else if (document.body) {
        scrollTop = document.body.scrollTop
      }
      return scrollTop
    }
    // 获取当前可视范围的高度
    function _getClientHeight() {
      let clientHeight = 0
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
      } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
      }
      return clientHeight
    }
    // 取文档内容实际高度
    function _getScrollHeight() {
      return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    }
    // 判断距离底部是否只有 100
    function _scrollAtBottom() {
      if (_getScrollTop() + _getClientHeight() >= _getScrollHeight() - 100) {
        return true
      } else {
        return false
      }
    }
    return _scrollAtBottom()
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
        }, remaining);
      }
      return result
    }
  }
}

const mapStateToProps = (state) => ({
  homeDisplayList: state.getIn(['home', 'homeDisplayList']),
  homeLoadingDataList: state.getIn(['home', 'homeLoadingDataList'])
})

const mapDispatchToProps = (dispatch) => ({
  getMoreDisplayData() {
    dispatch(actionCreators.getMoreDisplayDataAction())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Articles)