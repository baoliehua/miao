import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actionCreators } from '../store'
import Icon from '../../../components/icon'
import {
  BannerContainer,
  BannerImgContainer,
  BannerImg,
  BannerBtn,
  BannerDots,
  BannerDot
} from '../style'

class Banner extends PureComponent {
  constructor(props) {
    super(props)
    const {
      gotoPrevImg,
      gotoNextImg,
      gotoDesignatedImg
    } = props
    this.state = {
      bannerAutoplayID: null
    }
    this.throttleGotoPrevImg = this.throttle(gotoPrevImg, 820, {trailing: false})
    this.throttleGotoNextImg = this.throttle(gotoNextImg, 820, {trailing: false})
    this.throttleGotoDesignatedImg = this.throttle(gotoDesignatedImg, 820, {trailing: false})
    this.bannerAttachImg = this.bannerAttachImg.bind(this)
    this.bannerDisplay = this.bannerDisplay.bind(this)
    this.throttle = this.throttle.bind(this)
    this.bannerAutoplay = this.bannerAutoplay.bind(this)
    this.stopBannerAutoplay = this.stopBannerAutoplay.bind(this)
  }
  render() {
    const {
      bannerList,
      bannerDisplayImgIndex,
      bannerTotalDisplayImg
    } = this.props
    return (
      <BannerContainer
        onMouseEnter={this.stopBannerAutoplay}
        onMouseLeave={this.bannerAutoplay}
      >
        <BannerImgContainer
          ref={(node) => this.BannerImgContainerNode = node}
          style={{
              width: `${625 * (bannerTotalDisplayImg + 2)}px`,
              transform:`translateX(-${625 * bannerDisplayImgIndex}px)`,
              transition: 'all 0.8s ease'
            }}
        >
          { bannerTotalDisplayImg !== 0 && this.bannerAttachImg(bannerList.get(`${bannerTotalDisplayImg - 1}`)) }
          { this.bannerDisplay() }
          { bannerTotalDisplayImg !== 0 && this.bannerAttachImg(bannerList.get(0)) }
        </BannerImgContainer>
        <BannerBtn
          className="prev"
          onClick={() => {this.throttleGotoPrevImg(bannerDisplayImgIndex, bannerTotalDisplayImg)}}
        >
          <Icon type="prev"></Icon>
        </BannerBtn>
        <BannerBtn
          className="next"
          onClick={() => {this.throttleGotoNextImg(bannerDisplayImgIndex, bannerTotalDisplayImg)}}
        >
         <Icon type="next"></Icon>
        </BannerBtn>
        <BannerDots>
          {bannerList.map((item, index) => (
            <BannerDot
              key={item.get('id')}
              className = {
                (index + 1 === bannerDisplayImgIndex)
                  || (index === 0 && bannerDisplayImgIndex === bannerTotalDisplayImg + 1)
                  || (index === bannerTotalDisplayImg - 1 && bannerDisplayImgIndex === 0) ? 'active' : ''
              }
              onClick={() => {this.throttleGotoDesignatedImg(index + 1)}}
            >
              <span></span>
            </BannerDot>
          ))}
        </BannerDots>
      </BannerContainer>
    )
  }
  componentDidMount() {
    this.BannerImgContainerNode.addEventListener('transitionend', () => {
      const {
        bannerDisplayImgIndex,
        bannerTotalDisplayImg,
        gotoDesignatedImg
      } = this.props
      if (bannerDisplayImgIndex === 0) {
        this.BannerImgContainerNode.style.transition = ''
        gotoDesignatedImg(bannerTotalDisplayImg)
      } else if (bannerDisplayImgIndex === bannerTotalDisplayImg + 1) {
        this.BannerImgContainerNode.style.transition = ''
        gotoDesignatedImg(1)
      }
      setTimeout(() => {
        this.BannerImgContainerNode.style.transition = 'all 0.8s'
      })
    })
    this.bannerAutoplay()
  }
  componentWillUnmount() {
    this.stopBannerAutoplay()
  }
  bannerAttachImg(item) {
    return (
      <Link
        to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}
        key={item.get('id')}
      >
        <BannerImg src={item.get('imgUrl')}></BannerImg>
      </Link>
    )
  }
  bannerDisplay() {
    const {
      bannerList
    } = this.props
    return bannerList.map(item => {
      return (
        <Link
          to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}
          key={item.get('id')}
        >
          <BannerImg src={item.get('imgUrl')}></BannerImg>
        </Link>
      )
    })
  }
  throttle(func, wait = 0, options = {}) {
    // Specify invoking on the leading edge of the timeout.
    let {leading = true} = options
    // Specify invoking on the trailing edge of the timeout.
    let {trailing = true} = options
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
      } else if ( !timeoutID && trailing !== false) {
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
  bannerAutoplay() {
    this.stopBannerAutoplay()
    let bannerAutoplayID = setInterval(() => {
      const {
        bannerDisplayImgIndex,
        bannerTotalDisplayImg,
      } = this.props
      this.throttleGotoNextImg(bannerDisplayImgIndex, bannerTotalDisplayImg)
    }, 6000)
    this.setState({
      bannerAutoplayID
    })
  }
  stopBannerAutoplay() {
    clearInterval(this.state.bannerAutoplayID)
    this.setState({
      bannerAutoplayID: null
    })
  }
}

const mapStateToProps = (state) => ({
  bannerList: state.getIn(['home', 'bannerList']),
  bannerDisplayImgIndex: state.getIn(['home', 'bannerDisplayImgIndex']),
  bannerTotalDisplayImg: state.getIn(['home', 'bannerTotalDisplayImg'])
})

const mapDispatchToProps = (dispatch) => ({
  gotoPrevImg(bannerDisplayImgIndex, bannerTotalDisplayImg) {
    dispatch(actionCreators.gotoPrevImgAction(bannerDisplayImgIndex, bannerTotalDisplayImg))
  },
  gotoNextImg(bannerDisplayImgIndex, bannerTotalDisplayImg) {
    dispatch(actionCreators.gotoNextImgAction(bannerDisplayImgIndex, bannerTotalDisplayImg))
  },
  gotoDesignatedImg(designatedImgIndex) {
    dispatch(actionCreators.gotoDesignatedImgAction(designatedImgIndex))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Banner)