import React,{ Component } from 'react';

class Item extends Component{
    constructor(props) {
        super(props);
    }
    getInput = () =>{
        this.ele.addEventListener('blur', () =>{
            this.props.change(this.ele.value,this.props.path);
        })
    }
    componentDidMount() {
        // console.log('item',this.ele)
        this.ele.value = this.props.value;
        this.getInput();
    }
    render(){
    const len = Math.ceil(this.props.path.length/2);
   
      return(
        <div>
            <input ref={el => this.ele = el} placeholder= {len+'级类别名'+len} ></input>
            <button onClick={() => this.props.append(this.props.path)}>+</button>
            <button onClick={() => this.props.delete(this.props.path)}>-</button>  
        </div>    
      )
      
    }
    
}

export default Item;