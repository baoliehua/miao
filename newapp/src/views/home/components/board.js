import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
// 简书网站图片请求403, 使用本地图片
import img1 from '../../../assets/img/banner-s-3-7123fd94750759acf7eca05b871e9d17.png'
import img2 from '../../../assets/img/banner-s-4-b70da70d679593510ac93a172dfbaeaa.png'
import img3 from '../../../assets/img/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png'
import img4 from '../../../assets/img/banner-s-6-c4d6335bfd688f2ca1115b42b04c28a7.png'
import img5 from '../../../assets/img/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png'
import {
  BoardContainer
} from '../style'

class Board extends PureComponent {
  render() {
    return (
      <BoardContainer>
        <Link to={`${process.env.PUBLIC_URL}/collection/综艺`} className='board-item'>
          <img src={img1} alt='board'></img>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/collection/话剧`} className='board-item'>
          <img src={img2} alt='board'></img>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/collection/版权`} className='board-item'>
          <img src={img3} alt='board'></img>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/collection/学堂`} className='board-item'>
          <img src={img4} alt='board'></img>
        </Link>
        <Link to={`${process.env.PUBLIC_URL}/collection/连载小说`} className='board-item'>
          <img src={img5} alt='board'></img>
        </Link>
      </BoardContainer>
    )
  }
}

export default Board