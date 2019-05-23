import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { actionCreators } from './store'
import { actionCreators as viewsActionCreators } from '../store'
import Loading from '../../components/loading'
import {
  CollectionContainer,
  CollectionItem,
  ItemTitle,
  ItemExtract,
  ItemTime,
  ItemImg
} from './style'


class Collection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loadingPageShow: true
    }
  }
  render() {
    const { collectionData } = this.props
    const { loadingPageShow } = this.state
    return (
      <CollectionContainer>
        { loadingPageShow ? <Loading></Loading> : null }
        <ul>
          {
            collectionData
              .filter(item => item.get('thumbnail'))
              .map(item => (
                <CollectionItem key={item.get('pageid')}>
                  <Link to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}>
                    <ItemTitle>{item.get('title')}</ItemTitle>
                  </Link>
                  <ItemExtract>{item.get('extract')}</ItemExtract>
                  <ItemTime>{item.get('timestamp')}</ItemTime>
                  <Link to={`${process.env.PUBLIC_URL}/wiki/${item.get('title')}`}>
                    <ItemImg src={item.getIn(['thumbnail', 'source'])}></ItemImg>
                  </Link>
                </CollectionItem>
              ))
          }
        </ul>
      </CollectionContainer>
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
      getCollectionData
    } = this.props
    getCollectionData(match.params.keyword)
  }
  componentWillReceiveProps(nextProps) {
    const { keyword: prevKeyword } = this.props.match.params
    const { keyword: nextKeyword } = nextProps.match.params
    if (prevKeyword !== nextKeyword) {
      const { getCollectionData } = this.props
      getCollectionData(nextKeyword)
    }
  }
  componentDidUpdate() {
    this.setState({
      loadingPageShow: false
    })
  }
}

const mapStateToProps = (state) => ({
  collectionData: state.getIn(['collection', 'collectionData'])
})

const mapDispatchToProps = (dispatch) => ({
  getCollectionData(keyword) {
    dispatch(actionCreators.getCollectionDataAction(keyword))
  },
  recordPath(pathname) {
    dispatch(viewsActionCreators.recordPathAction(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Collection))