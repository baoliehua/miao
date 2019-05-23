import React, { PureComponent } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { actionCreators } from './store'
import { actionCreators as viewsActionCreators } from '../store'
import Loading from '../../components/loading'
import {
  WikiContainer,
  WikiTitle,
  WikiDescription,
  WikiThumbnail,
  WikiTimestamp,
  WikiImg,
  WikiExtract
} from './style'

class Wiki extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadingPageShow: true
    }
  }
  render() {
    const { wikiData } = this.props
    const { loadingPageShow } = this.state
    return (
      <WikiContainer>
        { loadingPageShow ? <Loading></Loading> : null }
        <WikiTitle>{wikiData.get('title')}</WikiTitle>
        <WikiDescription>
          <WikiThumbnail src={wikiData.getIn(['thumbnail', 'source'])}></WikiThumbnail>
          <div>
            <span>{wikiData.get('description') || wikiData.get('title')}</span>
            <WikiTimestamp>{wikiData.get('timestamp')}</WikiTimestamp>
          </div>
        </WikiDescription>
        <WikiImg src={wikiData.getIn(['thumbnail', 'source'])}></WikiImg>
        <WikiExtract>{wikiData.get('extract')}</WikiExtract>
      </WikiContainer>
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
      match,
      getWikiData
    } = this.props
    getWikiData(match.params.title)
  }
  componentWillReceiveProps(nextProps) {
    const { title: prevTitle } = this.props.match.params
    const { title: nextTitle } = nextProps.match.params
    if (prevTitle !== nextTitle) {
      const { getWikiData } = this.props
      getWikiData(nextTitle)
    }
  }
  componentDidUpdate() {
    this.setState({
      loadingPageShow: false
    })
  }
}

const mapStateToProps = (state) => ({
  wikiData: state.getIn(['wiki', 'wikiData'])
})

const mapDispatchToProps = (dispatch) => ({
  getWikiData(title) {
    dispatch(actionCreators.getWikiDataAction(title))
  },
  recordPath(pathname) {
    dispatch(viewsActionCreators.recordPathAction(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Wiki))