import React , { PureComponent } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { actionCreators } from './store';
import  * as actionCreatorsLogin  from '../../pages/login/store/actionCreator';
import { toJS } from 'immutable';
import { Link } from 'react-router-dom';
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



class Header extends PureComponent {

    getListArea() {
        const newList = this.props.list.toJS();
        const pageList = [];
        if(newList.length){
           for(var i = this.props.page * 10; i < this.props.page * 10 + 10 && i < newList.length;i++){
            pageList.push(
                <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
            );
            } 
        }
        
        if(this.props.focused || this.props.mouseEnter){
            return (
            <SearchInfo 
                onMouseEnter={this.props.handleMouseEnter}
                onMouseLeave={this.props.handleMouseLeave}
            >
                <SearchInfoTitle>
                    热门搜索
                    <SearchInfoSwitch onClick={() => this.props.handleChangePage(this.spinIcon)}>
                        <span className="iconfont spin" ref={(icon) => {this.spinIcon = icon}}>&#xe85f;</span> 
                        换一批
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
                <Link to='/'>
                    <Logo />
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载</NavItem>
                    {
                        this.props.login ? 
                        <NavItem className='right' onClick={this.props.logout}>退出</NavItem> 
                        : 
                        <Link to='/login'><NavItem className='right'>登陆</NavItem></Link>
                    }
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
                                onFocus={() => this.props.handleInputFocus(this.props.list)}
                                onBlur={this.props.handleInputBlur}
                            ></NavSerch>
                        </CSSTransition>
                        <span className={this.props.focused ? 'focused iconfont zoom':'iconfont zoom'}>&#xe6e4;</span>
                        {this.getListArea()}
                    </SearchWrapper>
                </Nav>
                <Addition>
                    <Link to='/write'>
                        <Button className='writting'>
                            <span className="iconfont">&#xe616;</span>                    
                            写文章
                        </Button>
                    </Link>
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
        login: state.getIn(['login','login']),
    }
}
 
const mapDispatchToProps  = (dispatch) =>{
    return {
        handleInputFocus(list){
            dispatch(actionCreators.searchFocus()); 
            if(list.size === 0){
                dispatch(actionCreators.getList());                
            }
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
        handleChangePage(spinIcon) {
            console.log(spinIcon.style.transform)
            if(spinIcon.style.transform === ""||spinIcon.style.transform === "rotate(0deg)"){
                spinIcon.style.transform = "rotate(720deg)"
            }else{
                spinIcon.style.transform = "rotate(0deg)"
            }
            dispatch(actionCreators.changePage());
        },
        logout() {
            dispatch(actionCreatorsLogin.logout());
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Header);