import styled, { css, keyframes } from 'styled-components'

const _themeBackgroung = css `
  background-color: ${props => props.theme.themeColor};
`
const _loadding = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`
export const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${_themeBackgroung};
  z-index: 999;
  .icon {
    font-size: 30px;
    animation: ${_loadding} 2s infinite linear;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
`