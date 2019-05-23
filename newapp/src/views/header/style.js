import styled, { css } from 'styled-components'
import logoImg from '../../assets/img/nav-logo.png'

const _themeBackgroung = css`
  background-color: ${props => props.theme.themeColor};
`

const _borderColor = css`
  border-color: ${props => props.theme.borderColor};
`
const _backgroundColor = css`
  background-color: ${props => props.theme.backgroundColor};
`
const _fontColor = css`
  color: ${props => props.theme.fontColor};
`
const _tagStyle = css`
  color: ${props => props.theme.tagStyle.color};
  border-color: ${props => props.theme.tagStyle.borderColor};
`
const _tagHoverStyle = css `
  color: ${props => props.theme.tagStyle.hoverColor};
  border-color: ${props => props.theme.tagStyle.hoverBorderColor};
`
export const Container = styled.header`
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  z-index: 1;
  ${_borderColor};
`
export const Content = styled.div `
  width: 1280px;
  height: 56px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: relative;
`
export const Logo = styled.span`
  display: block;
  width: 100px;
  height: 56px;
  float: left;
  background-image: url(${logoImg});
  background-size: contain;
  background-repeat: no-repeat;
`
export const NavBar = styled.nav`
  width: 945px;
  height: 56px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  background-color: transparent;
  a.selected span{
    color: #ea6f5a
  }
`
export const NavTab = styled.span`
  float: left;
  margin-right: 10px;
  height: 56px;
  line-height: 26px;
  padding: 15px;
  box-sizing: border-box;
  ${_fontColor};
  cursor: pointer;
  font-size: 18px;
  &.style-mode {
    float: right;
    line-height: 20px;
    padding: 17px 10px 17px 15px;
    font-size: 24px;
    color: #969696;
    box-sizing: border-box;
    position: relative;
    margin-right: 20px;
  }
  .icon {
    padding-right: 6px;
  }
`
export const ModeController = styled.div`
  &.fade-enter {
    top: 48px;
    opacity: 0;
    transition: opacity 200ms ease-in, top 200ms ease-in;
  }
  &.fade-enter-active {
    top: 56px;
    opacity: 1;
  }
  &.fade-exit {
    top: 56px;
    opacity: 1;
    transition: opacity 200ms ease-in, top 200ms ease-in;
  }
  &.fade-exit-active {
    top: 48px;
    opacity: 0;
  }
  position: absolute;
  top: 48px;
  left: -125px;
  width: 200px;
  z-index: 1;
  ${_themeBackgroung};
  padding: 12px;
  box-sizing: border-box;
  border-radius: 3px;
  box-shadow: 0 0px 8px 2px rgba(0,0,0,0.1);
  font-size: 14px;
  opacity: 0;
  pointer-events: none;
  .mode-info {
    padding: 8px;
  }
  .icon {
    font-size: 18px;
  }
  .btn-wrapper {
    float: right;
    padding: 8px 0;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid;
    ${_borderColor};
  }
  .active .icon {
    color: #c5c514;
  }
  &::before {
    content: '';
    position: absolute;
    top: -18px;
    left: 148px;
    border: 10px solid transparent;
    border-bottom-color: ${props => props.theme.themeColor}
  }
  &.show {
    opacity: 1;
    top: 56px;
    pointer-events: inherit;
  }
`
export const ModeControllerBtn = styled.span`
  padding: 9px 11px;
  &.active {
    background-color: #6dacf4;
    color: #fff;
  }
`
export const NavSearchWrapper = styled.div`
  float: left;
  padding-left: 15px;
  margin-right: 10px;
  position: relative;
  height: 56px;
`
export const NavSearchInput = styled.input.attrs({
  placeholder: '搜索'
})`
  &.slide-enter {
    width: 240px;
    transition: all 300ms ease-out;
  }
  &.slide-enter-active {
    width: 360px;
  }
  &.slide-exit {
    width: 360px;
    transition: all 300ms ease-out;
  }
  &.slide-exit-active {
    width: 240px;
  }
  &.discolor-enter {
    background-color: transparent;
    color: #969696;
    transition: all 300ms ease-in;
  }
  &.discolor-enter-active {
    background-color: #999;
    color: #fff;
  }
  &.discolor-exit {
    background-color: #999;
    color: #fff;
    transition: all 300ms ease-in;
  }
  &.discolor-exit-active {
    background-color: transparent;
    color: #969696;
  }
  width: 240px;
  height: 38px;
  padding: 0 40px 0 20px;
  font-size: 14px;
  border: none;
  border-radius: 40px;
  ${_backgroundColor};
  ${_fontColor};
  box-sizing: border-box;
  outline: none;
  position: relative;
  top: 9px;
  &.focused {
    width: 320px;
  }
`
export const NavSearchBtn = styled.a`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-2px, -50%);
  padding: 8px;
  border-radius: 50%;
  background-color: transparent;
  color: #969696;
  &.focused {
    background-color: #999;
    color: #fff;
  }
`
export const SearchTips = styled.div `
  position: absolute;
  box-shadow: 0 0 8px rgba(0,0,0,0.2);
  margin-top: 1px;
  width: 250px;
  left: 15px;
  top: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  ${_themeBackgroung};
  &::before {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${props => props.theme.themeColor}
    left: 20px;
    bottom: 99%;
  }
`
export const SearchTrending = styled.div`
  padding: 20px 20px 10px;
  border-bottom: 1px solid #f0f0f0;
  ${_borderColor};
  box-sizing: border-box;
`
export const SearchTrendingHeader = styled.div`
  height: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  span {
    float: left;
    font-size: 14px;
    color: #969696;
  }
`
export const SearchTrendingToggle = styled.a `
  float: right;
  font-size: 13px;
  background-color: transparent;
  border-width: 0;
  padding: 0;
  cursor: pointer;
  ${_tagStyle};
  &:hover {
    ${_tagHoverStyle};
  }
  .icon {
    margin-right: 5px;
    transition: all 0.2s ease-out;
  }
`

export const SearchTrendingTagWrap = styled.ul`
  li {
    margin-right: 10px;
    display: inline-block;
    line-height: 28px;
    box-sizing: border-box;
  }
  li a {
    padding: 2px 6px;
    font-size: 12px;
    border: 1px solid;
    ${_tagStyle}
    border-radius: 3px;
    cursor: pointer;
    text-decoration: none;
  }
  li a:hover {
    ${_tagHoverStyle}
  }
`
export const SearchRecent = styled.div`
  padding: 5px;
  box-sizing: border-box;
`
export const SearchRecentItmeWrap = styled.ul`
  li {
    box-sizing: border-box;
  }
  li:hover {
    ${_backgroundColor};
  }
  li:hover .icon-unfollow {
    display: block;
  }
  li a {
    display: block;
    height: 40px;
    line-height: 20px;
    padding: 10px 15px;
    font-size: 14px;
    ${_fontColor};
    position: relative;
    cursor: pointer;
    box-sizing: border-box;
    text-decoration: none;
  }
`
export const SearchRecentItemPart = styled.span`
  &.icon-search-history {
    float: left;
    margin-right: 10px;
    font-size: 18px;
    color: #787878;
  }
  &.recent-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
    padding-right: 30px;
  }
  &.icon-unfollow {
    position: absolute;
    right: 15px;
    top: 10px;
    color: #a0a0a0;
    display: none;
  }
`
export const StatusBar = styled.div`
  float: right;
  position: relative;
  z-index: 1;
`
export const StatusItem = styled.span`
  text-align: center;
  white-space: nowrap;
  padding: 6px 12px;
  font-size: 15px;
  float: right;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 24px;
  /* &.write-btn {
    width: 100px;
    height: 40px;
    margin: 8px 15px 0;
    border-radius: 20px;
    color: #fff;
    background-color: #ea6f5a;
  } */
  &.sign-up {
    width: 80px;
    height: 38px;
    margin: 9px 5px 0 15px;
    border: 1px solid rgba(236, 97, 73, 0.7);
    border-radius: 20px;
    font-size: 15px;
    color: #ea6f5a;
  }
  &.sign-up:hover {
    color: #ec6149;
    border-color: #ec6149;
    background-color: rgba(236, 97, 73, 0.05)
  }
  &.log-in {
    color: #969696;
    margin: 11px 6px 0 10px;
    font-size: 15px;
  }
  .icon {
    padding-right: 6px;
  }
`

export const SearchRelated = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  max-height: 200%;
  ${_themeBackgroung};
  overflow: auto;
  a {
    display: block;
    height: 40px;
    line-height: 20px;
    padding: 10px 15px;
    font-size: 14px;
    ${_fontColor};
    cursor: pointer;
    box-sizing: border-box;
    text-decoration: none;
    border-bottom: 1px solid;
    ${_borderColor};
  }
  a:hover {
    ${_backgroundColor};
  }
`
export const UserInfo = styled.div`
  margin-right: 60px;
  padding: 7px 30px;
  position: relative;
  cursor: pointer;
  &::after {
    content: '';
    position: absolute;
    top: 26px;
    left: 76px;
    border: 6px solid transparent;
    border-top-color: #999;
  }
  &:hover {
    ${_backgroundColor};
  }
  &:hover > div {
    display: block;
  }
`
export const UserAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`
export const UserMenu = styled.div`
  position: absolute;
  width: 100%;
  height: 46px;
  left: 0;
  top: calc(100% - 2px);
  padding: 5px 0;
  margin: 2px 0 0;
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  display: none;
  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 42px;
    margin-top: 2px;
  }
  div .icon {
    color: #ea6f5a;
    margin-left: 5px;
  }
  div span {
    margin-right: 5px;
  }
  div:hover {
    ${_backgroundColor};
  }
`