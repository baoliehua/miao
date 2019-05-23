import styled, { css } from 'styled-components'
import logoImg from '../../assets/img/nav-logo.png'

const _themeBackgroung = css `
  background-color: ${props => props.theme.themeColor};
`
const _backgroundColor = css `
  background-color: ${props => props.theme.backgroundColor};
`
const _fontColor = css `
  color: ${props => props.theme.fontColor};
`

export const Logo = styled.div`
  background-image: url(${logoImg});
  width: 150px;
  height: 100px;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  position: absolute;
  top: 50px;
  left: 50px;
`
export const SignContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  ${_backgroundColor};
  z-index: 999;
`
export const  SignMain = styled.div`
  width: 400px;
  padding: 30px;
  ${_themeBackgroung};
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0,0,0,0.2);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  div {
    position: relative;
  }
  div .icon {
    position: absolute;
    font-size: 18px;
    top: 16px;
    left: 9px;
  }
`
export const SignTitle = styled.h3`
  font-weight: 700;
  color: #ea6f5a;
  padding: 10px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
`
export const SignInput = styled.input`
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin-bottom: 0;
  padding: 4px 12px 4px 35px;
  border: 1px solid #999;
  border-radius: 0 0 4px 4px;
  background-color: hsla(0,0%,71%,.1);
  vertical-align: middle;
  outline: none;
  ${_backgroundColor};
  ${_fontColor};
  &.user {
    border-bottom: none;
    border-radius: 4px 4px 0 0;
  }
`
export const SignBtn = styled.button`
  margin-top: 30px;
  width: 100%;
  padding: 9px 18px;
  font-size: 18px;
  border: none;
  border-radius: 25px;
  color: #fff;
  background: #3194d0;
  cursor: pointer;
  outline: none;
  display: block;
  clear: both;
  box-sizing: border-box;
`