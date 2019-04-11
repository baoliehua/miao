import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
    HeaderWrapper,
    Logo,
    Nav,
    NavItem,
    NavSerch,
    Addition,
    Button,
    SearchWrapper,
}   from './style';
import {GlobalStyled} from '../../statics/iconfont/iconfont';

class Header extends Component {
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
        focused: state.focused, 
    }
}
 
const mapDispatchToProps  = (dispatch) =>{
    return {
        handleInputFocus(){
            console.log(1);
        }
    }
}

export default connect(mapStoreToProps,mapDispatchToProps)(Header);