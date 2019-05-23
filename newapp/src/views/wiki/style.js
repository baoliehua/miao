import styled, { css } from 'styled-components'

const _detailColor = css `
  color: ${props => props.theme.detailColor};
`

export const WikiContainer = styled.article`
  width: 620px;
  margin: 0 auto;
`
export const WikiTitle = styled.h1`
  margin: 20px 0 0;
  font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  font-size: 34px;
  font-weight: 700;
  line-height: 1.3;
  text-align: center;
`
export const WikiDescription = styled.div`
  margin: 30px 0 40px;
  box-sizing: border-box;
  height: 48px;
  & > div {
    margin-left: 60px;
    height: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`
export const WikiThumbnail = styled.img`
  width: 48px;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 50%;
  float: left;
`
export const WikiTimestamp = styled.div`
  font-size: 12px;
  ${_detailColor};
`
export const WikiImg = styled.img`
  max-width: 500px;
  display: block;
  margin: 0 auto;
`
export const WikiExtract = styled.p`
  margin: 25px 0;
  letter-spacing: 1px;
  line-height: 2em;
  font-size: 16px;
`