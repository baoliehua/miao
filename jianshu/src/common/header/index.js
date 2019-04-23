import React , { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import { toJS } from 'immutable';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSerch,
    SearchInfo,
    SearchInfoTitle,
    SearchInfoSwitch,
    SearchInfoList,
    SearchInfoItem,
    Addition,
    Button,
    SearchWrapper,
}   from './style';
import {GlobalStyled} from '../../statics/iconfont/iconfont';



class Header extends Component {

    getListArea(show) {
        const newList = this.props.list.toJS();
        const pageList = [];
        for(var i = this.props.page * 10; i < this.props.page * 10 + 10;i++){
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            );
        }
        if(this.props.focused || this.props.mouseEnter){
            return (
            <SearchInfo 
                onMouseEnter={this.props.handleMouseEnter}
                onMouseLeave={this.props.handleMouseLeave}
            >
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick={this.props.handleSwitchItem}>
                        ~ 换一批
                    </SearchInfoSwitch>
                </SearchInfoTitle>
                <SearchInfoList>
                    {
                        pageList
                    }
                </SearchInfoList>
            </SearchInfo>);
        }else{
            return null;
        }
    }

    render() {
        return (
            <HeaderWrapper>
                <GlobalStyled />
                <Logo href = '/'/>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载</NavItem>
                    <NavItem className='right'>登陆</NavItem>
                    <NavItem className='right'>
                      <span className="iconfont">&#xe636;</span>
                    </NavItem>
                    <SearchWrapper>
                        <CSSTransition
                            in={this.props.focused}
                            timeout={200}
                            classNames="slide"
                        >
                            <NavSerch
                                className={this.props.focused ? 'focused':''}
                                onFocus={this.props.handleInputFocus}
                                onBlur={this.props.handleInputBlur}
                            ></NavSerch>
                        </CSSTransition>
                        <span className={this.props.focused ? 'focused iconfont':'iconfont'}>&#xe6e4;</span>
                        {this.getListArea(this.props.focused)}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Button className='writting'>
                        <span className="iconfont">&#xe616;</span>                    
                        写文章
                    </Button>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        )
    }
}



const mapStoreToProps  = (state) =>{
    return {
        focused: state.getIn(["header","focused"]),
        list: state.getIn(["header","list"]),
        page: state.getIn(["header","page"]),
        totalPage: state.getIn(["header","totalPage"]),
        mouseEnter: state.getIn(["header","mouseEnter"]),
    }
}
 
const mapDispatchToProps  = (dispatch) =>{
    return {
        handleInputFocus(){
            dispatch(actionCreators.searchFocus()); 
            dispatch(actionCreators.getList());
        },
        handleInputBlur() {
            dispatch(actionCreators.searchBlur());
        },
        handleMouseEnter() {
            dispatch(actionCreators.mouseEnter());
        },
        handleMouseLeave() {
            dispatch(actionCreators.mouseLeave());
        },
        handleSwitchItem() {
            dispatch(actionCreators.switchItem());
        },
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Header);