import React, { Component } from 'react';
import './App.css';
import PixelGrid from './PixelGrid';
import OnlineCount from './OnlineCount';
import io from 'socket.io-client';
import ColorSelect from './ColorSelect';

/**
 * 放大、拖动、取色、限制绘制频率、在线人数、页面内实时聊天
 * PureComponent
 * Hooks
 * ReactDom.createPotal
 * socket.io
 * canvas
 * Jimp
 * ArrayBuffer to img
 * 
 */

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      currentColor: '#ff0000',
    }
    this.socket = io();
  }
  componentDidMount() {
    console.log(this.state.currentColor)
    
    // this.socket.on('pixel-data', (data) =>{
    //   console.log(data);
    //   this.setState({
    //     pixelData: data,
    //   })
    // });
    // this.socket.on('updata-dot',({row,col,color}) => {
    //   this.setState(produce(this.state, state =>{
    //     state.pixelData[row][col] = color;
    //   }))
    // })
  }
  handlePixelClick = (x, y) => {
    // console.log(x,y,this.state.currentColor)
    // this.socket.emit('draw-dot',{
    //   row:x,
    //   col:y,
    //   color: this.state.currentColor,
    // })
  }

  changeCurrentColor = (color) => {
    console.log(color);
    this.setState({
      currentColor: color,
    })
  }

 

  render (){
    return (
      <div>
        <div id='topro'></div>
        <PixelGrid onPickColor={this.changeCurrentColor} currentColor={this.state.currentColor} socket={this.socket} />
        <span id='color-pick-placeholder' ></span>
        <ColorSelect onChange={this.changeCurrentColor} color={this.state.currentColor}/>
        <OnlineCount socket={this.socket}></OnlineCount>
      </div>
    )
  }
}

export default App;
