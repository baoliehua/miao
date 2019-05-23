import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreator from './store/actionCreator';
import {
    LoginWrapper,
    LoginBox,
    Input,
    Button,
} from './style';
class Detail extends PureComponent {
    render() {
        if(!this.props.loginState){
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder='账号' ref={(input) => {this.account = input}}/>
                        <Input placeholder='密码' type='password' ref={(input) => {this.password = input}}/>
                        <Button onClick={() => this.props.login(this.account,this.password)}>提交</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        }else{
            return <Redirect to='/' />
        }
        
    }
    
}

const mapStateToProps = (state) => ({
    loginState: state.getIn(['login','login']),
})

const mapDispatchToProps = (dispatch) => ({
    login(accountElem,passwordElem) {
        dispatch(actionCreator.login(accountElem.value,passwordElem.value));
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Detail);