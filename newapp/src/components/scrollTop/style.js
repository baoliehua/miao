import styled, { css } from 'styled-components'

const _themeBackgroung = css `
  background-color: ${props => props.theme.themeColor};
`
const _detailColor = css `
  color: ${props => props.theme.detailColor};
`
const _borderColor = css `
  border-color: ${props => props.theme.borderColor};
`
const _backgroundColor = css `
  background-color: ${props => props.theme.backgroundColor};
`

export const ScrollTopContainer = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  box-sizing: border-box;
  ${_detailColor};
  ${_themeBackgroung};
  border: solid 1px;
  ${_borderColor};
  position: fixed;
  right: 50px;
  bottom: 60px;
  display: none;
  outline: none;
  font-size: 16px;
  &.show {
    display: block;
  }
  &:hover {
    ${_backgroundColor};
  }
  &::after {
    content: '回到顶部';
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translate(-100%, -50%);
    white-space: nowrap;
    font-size: 14px;
    background-color: #333;
    color: #fff;
    border-radius: 4px;
    padding: 5px 10px;
    box-sizing: border-box;
    display: none;
  }
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-100%, -50%);
    width: 12px;
    height: 12px;
    border: 6px solid transparent;
    box-sizing: border-box;
    border-left: 6px solid #333;
    display: none;
  }
  &:hover::after, &:hover::before {
    display: block;
  }
`