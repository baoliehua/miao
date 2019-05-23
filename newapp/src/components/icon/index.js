import React, { forwardRef } from 'react'
import '../../assets/svg'
import { Svg } from './style'

const Icon = forwardRef((props, ref) => (
  <Svg className='icon' aria-hidden='true' ref={ref}>
    <use xlinkHref={`#icon-${props.type}`}></use>
  </Svg>
))

export default Icon