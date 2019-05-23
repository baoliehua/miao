import styled, { css } from 'styled-components'

const _fontColor = css `
  color: ${props => props.theme.fontColor};
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
export const SubContrainer = styled.div `
  width: 620px;
  margin: 20px auto;
  min-height: 500px;
`
export const SubItem = styled.li`
  margin: 0 0 20px;
  padding: 0 0 20px;
  border-bottom: 1px solid;
  ${_borderColor};
  line-height: 20px;;
  box-sizing: border-box;
`
export const SubItemTag = styled.div`
  margin-bottom: 13px;
  font-size: 12px;
  color: #ec6e56;
  .icon {
    margin: 0 3px;
  }
`
export const SubItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SubItemImg = styled.img`
  width: 52px;
  height: 52px;
  border: 1px solid;
  ${_borderColor};
  border-radius: 10%;
  vertical-align: middle;
`
export const SubItemInfo = styled.div`
  flex-grow: 1;
  margin: 0 20px;
  & > a {
    text-decoration: none;
  }
`
export const SubItemTitle = styled.p`
  margin: 0 0 5px;
  font-size: 15px;
  font-weight: 700;
  ${_fontColor};
  display: block;
`
export const SubItemIntroduction = styled.p`
  margin: 0 0 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  ${_detailColor};
  .icon {
    margin-right: 3px;
  }
`
export const SubItemBtn = styled.button`
  border-radius: 40px;
  color: #fff;
  background-color: #42c02e;
  font-size: 16px;
  padding: 8px 0;
  width: 100px;
  height: 39px;
  border: none;
  outline: none;
  text-align: center;
  cursor: pointer;
  span {
    margin-right: 6px;
  }
  .icon {
    font-size: 14px;
    padding: 1px;
    margin: 0 5px;
  }
  &:hover {
    background-color: #3db922;
  }
  &.subscribed {
    ${_backgroundColor};
    ${_detailColor};
    ${_backgroundColor};
  }
`