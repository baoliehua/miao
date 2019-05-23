import React, { PureComponent } from 'react'
import Icon from '../icon'
import { ScrollTopContainer } from './style'

class ScrollTop extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      scrollTopBtnShow: false
    }
    this.showScrollTopBtn = this.showScrollTopBtn.bind(this)
  }
  render() {
    const {
      scrollTopBtnShow
    } = this.state
    return (
      <ScrollTopContainer
        className={scrollTopBtnShow ? 'show' : ''}
        onClick={this.scrollToTop}
      >
        <Icon type="up"></Icon>
      </ScrollTopContainer>
    )
  }
  componentDidMount() {
    window.addEventListener('scroll', this.showScrollTopBtn)
  }
  componentWillMount() {
    window.removeEventListener('scroll', this.showScrollTopBtn)
  }
  scrollToTop() {
    window.scrollTo(0, 0)
  }
  showScrollTopBtn() {
    if (document.documentElement.scrollTop > 120) {
      this.setState({
        scrollTopBtnShow: true
      })
    } else {
      this.setState({
        scrollTopBtnShow: false
      })
    }
  }
}

export default ScrollTop