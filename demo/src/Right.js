import React,{ Component} from 'react';
import './Right.css';

class Right extends Component {
    constructor (props){
        super(props);
        this.state = {
            list: [],
            title: '',
        }
    }
    //点击时切换显示
    clickLabel = (children,index) => {
        // console.log('index',index)
        let newList = this.state.list.slice(0,index+1);
        if(children !== undefined){
            newList.push(children);
        } 
        
        // console.log('new',newList,children)
        this.setState({
            list: newList,
        })
        // console.log(children,this.state.list);
    } 

    //更新数据
    updata() {
        if(this.props.state.category=== undefined){
            this.setState({
                list: [this.props.state.labels],
                title: '无题名',
            }) 
        }else{
           this.setState({
                list: [this.props.state.labels],
                title: this.props.state.category,
            }) 
        }
        
    }

    //初始化
    componentDidMount () {
        this.updata();
    }

    //当题目名称发生改变时，更新右侧
    componentDidUpdate () {
        if(this.props.state.category !== this.state.title){
            this.updata();
        }
    }

    render() {
        return (
            <div id='right'>
                <div>已添加题目：</div>
                <div id='list'>
                    <div id = 'title'><span></span>{this.state.title}</div>
                    {this.state.list.map( (item,index) => <div  key={index} className='items'>
                        <div>第{index+1}步：请选择{index+1}级类别</div>
                        {item.map( (i,index1) => <div className='item' key={i.labelName+index1}  onClick={() => this.clickLabel(i.children,index)}>{i.labelValue} </div>)}
                    </div>)}
                </div>
            </div>
        );
    }
}

export default Right;