import styled, {css} from 'styled-components'

const _borderColor = css `
  border-color: ${props => props.theme.borderColor};
`
const _fontColor = css `
  color: ${props => props.theme.fontColor};
`
const _detailColor = css `
  color: ${props => props.theme.detailColor};
`

export const CollectionContainer = styled.div`
  width: 620px;
  min-height: 200px;
  margin: 0 auto;
  ul {
    padding: 10px 10px 20px 10px;
  }
`
export const CollectionItem = styled.li`
  width: 100%;
  padding: 15px 2px 15px 0;
  border-bottom: 1px solid;
  ${_borderColor};
  word-wrap: break-word;
  position: relative;
  min-height: 112px;
`
export const ItemTitle = styled.span`
  margin: -7px 0 4px;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.5;
  box-sizing: border-box;
  ${_fontColor};
  display: inline-block;
  text-decoration: none;
  letter-spacing: 1px;
  &:hover {
    text-decoration: underline;
  }
`
export const ItemExtract = styled.p`
  margin: 0 120px 12px 0;
  font-size: 13px;
  line-height: 24px;
  ${_detailColor};
`
export const ItemTime = styled.span`
  padding-right: 0;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  box-sizing: border-box;
  ${_detailColor};
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