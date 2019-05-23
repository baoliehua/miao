import React, { PureComponent } from 'react';
import Writer from './components/Writer';
import List from './components/List';
import Recommond from './components/Recommond';
import Topic from './components/Topic';
import { connect } from 'react-redux';
import * as actionCreator from './store/actionCreator'
import {
    HomeWrapper,
    HomeLeft,
    HomeRight,
    BackTop,
} from './style';

class Pages extends PureComponent {
    handleScrollTop(){
        window.scrollTo(0,0);
    }
    render() {
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-img" src="https://upload.jianshu.io/admin_banners/web_images/4592/22f5cfa984d47eaf3def6a48510cc87c157bf293.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
                    <Topic />
                    <List />
                </HomeLeft>
                <HomeRight>
                    <Recommond />
                    <Writer />
                </HomeRight>
                {this.props.showScroll ? <BackTop onClick={this.handleScrollTop}>回到顶部</BackTop> : null} 
                
            </HomeWrapper>
        )
    }
    componentDidMount() {
        this.props.changeHomeData();
        this.bindEvents();
    }

    bindEvents() {
        window.addEventListener('scroll', this.props.changeScrollTopShow);
    }
}
const mapStateToProps = (state) => ({
    showScroll : state.getIn(['home','showScroll']),
})
const mapDispatchToProps = (dispatch) => ({
    changeHomeData (){
       dispatch(actionCreator.getHomeInfo());
    },
    changeScrollTopShow (){
        if(document.documentElement.scrollTop > 400){
            dispatch(actionCreator.toggleTopShow(true));
        }else{
            dispatch(actionCreator.toggleTopShow(false));
        }
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Pages);