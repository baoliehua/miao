import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Icon from '../../../components/icon'
import {
  RecommendContainer,
  RecommendImg,
  RecommendInfo,
  MoreRecommend
} from '../style'

class Recommend extends PureComponent {
  render() {
    const { recommendList } = this.props
    return (
      <RecommendContainer>
        {
          recommendList.map(item => {
            return (
              <Link
                to={`${process.env.PUBLIC_URL}/collection/${item.get('title')}`}
                key={item.get('id')}
              >
                <RecommendImg src={item.get('imgUrl')}></RecommendImg>
                <RecommendInfo>{item.get('title')}</RecommendInfo>
              </Link>
            )
          })
        }
        <MoreRecommend>
          <Link to={`${process.env.PUBLIC_URL}/subscription`}>
            更多热门推荐
            <Icon type="next"></Icon>
          </Link>
        </MoreRecommend>
      </RecommendContainer>
    )
  }
}

const mapStateToProps = (state) => ({
  recommendList: state.getIn(['home', 'recommendList'])
})

export default connect(mapStateToProps, null)(Recommend)