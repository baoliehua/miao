import styled, { css, keyframes } from 'styled-components'

const _fontColor = css`
  color: ${props => props.theme.fontColor};
`
const _detailColor = css`
  color: ${props => props.theme.detailColor};
`
const _borderColor = css`
  border-color: ${props => props.theme.borderColor};
`
const _backgroundColor = css`
  background-color: ${props => props.theme.backgroundColor};
`
const _loadingFirst = keyframes `
  0% {
    width: 100%;
  }
  50%{
    width: 50%;
  }
  100%{
    width: 100%;
  }
`
const _loadingSecond = keyframes `
  0% {
    width: 50%;
  }
  50%{
    width: 100%;
  }
  100%{
    width: 50%;
  }
`
export const Container = styled.div`
  width: 945px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 15px;
`
export const Content = styled.div`
  margin-left: -15px;
  margin-right: -15px;
  box-sizing: border-box;
  position: relative;
`
export const Main = styled.div`
  padding-top: 30px;
  padding-left: 15px;
  margin-right: 320px;
  width: 640px;
  box-sizing: border-box;
`
export const Aside = styled.aside`
  position: absolute;
  right: 0;
  top: 0;
  padding: 30px 0 0;
  margin-left: 40px;
  box-sizing: border-box;
  width: 280px;
  overflow: hidden;
`

// banner 区域

export const BannerContainer = styled.div`
  width: 625px;
  height: 270px;
  position: relative;
  margin-bottom: 35px;
  border-radius: 6px;
  overflow: hidden;
  &:hover .prev, &:hover .next {
    opacity: 1
  }
`
export const BannerImgContainer = styled.div`
  display: flex;
`
export const BannerImg = styled.img`
  width: 625px;
  height: 270px;
  vertical-align: middle;
`
export const BannerBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-image: none;
  background-color: rgba(0,0,0,.4);
  height: 50px;
  width: 40px;
  border: none;
  font-size: 20px;
  color: #fff;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
  cursor: pointer;
  opacity: 0;
  outline: none;
  &.prev {
    left: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  &.next {
    right: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
`
export const BannerDots = styled.ul`
  position: absolute;
  left: 50%;
  bottom: 0;
  box-sizing: border-box;
  margin-bottom: 8px;
  width: 80%;
  height: 24px;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
`
export const BannerDot = styled.li`
  width: 25px;
  box-sizing: border-box;
  margin: 6px;
  cursor: pointer;
  padding: 8px 0;
  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: rgba(0,0,0,.4);
    transition: all 0.8s ease;
  }
  &.active span {
    background-color: #fff;
  }
`

// recommend 区域

export const RecommendContainer = styled.div`
  margin-bottom: 20px;
  width: 625px;
  box-sizing: border-box;
  & > *:not(div) {
    ${_fontColor};
    display: inline-block;
    margin: 0 30px 18px 0;
    min-height: 32px;
    ${_backgroundColor};
    border: 1px solid;
    ${_borderColor};
    border-radius: 4px;
    vertical-align: top;
    overflow: hidden;
    text-decoration: none;
    box-sizing: border-box;
    box-shadow: 0 0 6px 0px #999
  }
`
export const RecommendImg = styled.img`
  width: 32px;
  height: 32px;
  vertical-align: middle;
`
export const RecommendInfo = styled.span`
  display: inline-block;
  padding: 0 12px 0 10px;
  font-size: 14px;
  box-sizing: border-box;
`
export const MoreRecommend = styled.div`
  display: inline-block;
  margin-top: 7px;
  font-size: 14px;
  a {
    ${_detailColor};
    text-decoration: none;
  }
  a .icon {
    font-size: 12px;
  }
`

// articles 区域

export const ArticlesContainer = styled.ul`
`
export const  ArticlesItem = styled.li`
  .title {
    margin: -7px 0 4px;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    box-sizing: border-box;
    ${_fontColor};
    display: inline-block;
    text-decoration: none;
    letter-spacing: 1px;
  }
  .title:hover {
    text-decoration: underline;
  }
  width: 100%;
  padding: 15px 2px 15px 0;
  border-top: 1px solid;
  ${_borderColor};
  word-wrap: break-word;
  position: relative;
  min-height: 112px;
`
export const ItemImg = styled.img`
  width: 102px;
  height: 112px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  border-radius: 3px;
`
export const ItemExtract = styled.p`
  margin: 0 120px 12px 0;
  font-size: 13px;
  line-height: 24px;
  ${_detailColor};
`
export const ItemTime = styled.span `
  padding-right: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  box-sizing: border-box;
  ${_detailColor};
`
export const LoadMoreTitle = styled.div`
  margin-bottom: 4px;
  height: 24px;
  width: 50%;
  box-sizing: border-box;
  display: inline-block;
  ${_backgroundColor};
`
export const LoadMoreExtract = styled.div`
  margin-right: 120px;
`
export const LoadMoreExtractPart = styled.div`
  height: 20px;
  ${_backgroundColor};
  height: 16px;
  box-sizing: border-box;
  margin: 8px 0;
  &:last-child {
    animation: ${_loadingFirst} 1.2s ease-in-out infinite;
  }
  &:nth-child(2) {
    animation: ${_loadingSecond} 1.2s ease-in-out infinite;
  }
`
export const LoadMoreImg = styled.div`
  width: 102px;
  height: 112px;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  ${_backgroundColor};
  border-radius: 3px;
`

// board 区域

export const BoardContainer = styled.div `
  width: 280px;
  margin-top: -4px;
  padding-bottom: 4px;
  min-height: 228px;
  box-sizing: border-box;
  .board-item {
    width: 100%;
    box-sizing: border-box;
    display: inline-block;
    margin-bottom: 6px;
  }
  .board-item img {
    width: 100%;
    min-height: 50px;
    border-radius: 4px;
  }
`

// download 区域

export const DownloadContainer = styled.div `
  width: 100%;
  padding: 10px 22px;
  margin-bottom: 30px;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  background-color: #fff;
  box-sizing: border-box;
  vertical-align: middle;
  cursor: pointer;
  position: relative;
  &:hover .hover-qr {
    display: block;
  }
  .hover-qr {
    width: 200px;
    height: 200px;
    position: absolute;
    top: -14px;
    left: 40px;
    transform: translateY(-100%);
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    border: 1px solid #999;
    border-radius: 4px;
    box-shadow: 0 5px 16px 1px #999;
    display: none;
    opacity: 0.9;
  }
  .hover-qr::after {
    content:'';
    position: absolute;
    top: 196px;
    left: 86px;
    width: 28px;
    height: 28px;
    box-sizing: border-box;
    border: 14px solid transparent;
    border-top: 14px solid #fff;
  }
  .hover-qr img {
    width: 100%;
    height: 100%;
  }
  .qr-code {
    width: 60px;
    height: 60px;
    opacity: 0.85;
    vertical-align: middle;
  }
  .info {
    display: inline-block;
    margin-left: 7px;
    box-sizing: border-box;
    vertical-align: middle;
  }
  .info > div:first-child {
    font-size: 15px;
    color: #333;
    box-sizing: border-box;
  }
  .info > div:first-child .icon {
    font-size: 12px;
  }
  .info > div:last-child {
    margin-top: 6px;
    font-size: 13px;
    color: #999;
    box-sizing: border-box;
  }
`
