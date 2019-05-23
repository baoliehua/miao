import React, { PureComponent } from 'react'
import Icon from '../icon'
import { LoadingContainer } from './style'

class Loading extends PureComponent {
  render() {
    return (
      <LoadingContainer>
        <Icon type="loading"></Icon>
      </LoadingContainer>
    )
  }
}

export default Loading