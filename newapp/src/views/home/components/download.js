import React, { PureComponent } from 'react'
import Icon from '../../../components/icon'
import downloadImg from '../../../assets/img/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png'
import {
  DownloadContainer
} from '../style'

class Download extends PureComponent {
  render() {
    return (
      <DownloadContainer>
        <div className='hover-qr'>
          <img
            src={downloadImg}
            alt='downloadImg'
          ></img>
        </div>
        <img
          src={downloadImg}
          alt='downloadImg'
          className='qr-code'
        ></img>
        <div className='info'>
          <div>
            下载简书手机App
            <Icon type="next"></Icon>
          </div>
          <div>
            随时随地发现和创新内容
          </div>
        </div>
      </DownloadContainer>
    )
  }
}

export default Download