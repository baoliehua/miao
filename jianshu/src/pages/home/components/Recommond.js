import React ,{ PureComponent } from 'react';
import { RecommondWrapper, RecommondItem } from '../style';
import { connect } from 'react-redux';


class Recommond extends PureComponent {
    render() {
        return (
            <RecommondWrapper>
                {
                    this.props.list.map((item) => {
                        return <RecommondItem imgUrl={item.get('imgUrl')} key={item.get('id')}/>
                    })
                }
            </RecommondWrapper>
        )
    }
}

const mapStateToProps = (state) => ({
    list : state.getIn(['home','recommondList']) 
})
export default connect(mapStateToProps,null)(Recommond);