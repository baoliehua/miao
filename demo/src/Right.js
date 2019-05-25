import React,{ Component} from 'react';


class Right extends Component {
    constructor (props){
        super(props);
        console.log(this.props.state)
        this.state = {
            list: [],
            title: '',
        }
    }

    clickLabel = (children,index) => {
        console.log('index',index)
        
        let newList = this.state.list.slice(0,index+1);
        if(children !== undefined){
            newList.push(children);
        } 
        
        
        console.log('new',newList,children)
        this.setState({
            list: newList,
        })
        // console.log(children,this.state.list);

    } 
    updata() {
        // if(this.props.state.category=== undefined){
        //     return;
        // }
        this.setState({
            list: [this.props.state.labels],
            title: this.props.state.category,
        })
    }
    componentDidMount () {
        this.updata();
        console.log(this.props)
    }
    componentDidUpdate () {
        console.log(this.props)

        if(this.props.state.category !== this.state.title){

            this.updata();
        }
    }
    render() {
        // this.updata();
        // debugger;
        return (
            <div className = 'right' style={{float:'right',width:'33%',background:'gray'}}>
                <div>已添加题目：</div>
                <div style={{background:'white',marginLeft:'10px'}}>
                    <div style={{borderBottom:'2px solid gray'}}>{this.state.title}</div>
                    {console.log(this.state.list)}
                    {this.state.list.map( (item,index) => <div  key={index} style={{width:'100%',height:'100px',borderBottom:'2px solid gray',marginBottom:'10px'}}>
                        <div>第{index+1}步：请选择{index+1}级类别</div>
                        {item.map( (i) => <div key={i.labelName}  onClick={() => this.clickLabel(i.children,index)}>{i.labelValue} </div>)}
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Right;