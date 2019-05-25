import React,{ Component } from 'react';
import Item from './Item';
import { fromJS, toJS } from 'immutable';
class Left extends Component {
    constructor (props){
        super(props);
        this.state={
            category: '',
            labels:[],
            show:'false',
            
        }
        this.newstate = fromJS(this.state.labels);
    }

    createNode = (value) => {
        let newNode = {};
        newNode.labelName = value;
        newNode.labelValue = value;
        return newNode;
    }

    produceTree = (parent,value) => {
        let child = this.createNode(value);
        parent.children === undefined ? parent.children = [child] : parent.children.push(child);
    }

    inputChange = (value,dataPath) => {
        this.newstate = this.newstate.setIn([...dataPath,"labelName"],value);
        this.newstate = this.newstate.setIn([...dataPath,"labelValue"],value);
        this.setState({labels : this.newstate.toJS()})
        // console.log(this.state,value,dataPath,this.newstate.getIn([...dataPath,"labelName"]))
    }

    appendFist = () => {
        let newInput = this.createNode('');
        // console.log(this.state.labels.slice().push(newInput))
        let appendone = this.state.labels.slice();
        appendone.push(newInput);
        this.newstate = fromJS(appendone)
        this.setState({
            labels : appendone
        })
    }

    appendChild = (dataPath) => {
        let newInput = this.createNode('');
        // console.log(this.state.labels.slice().push(newInput))
        // console.log(this.newstate.getIn([...dataPath,'children'] ).toJS())
        let newList;
        if(this.newstate.getIn([...dataPath,'children'])){
            newList = this.newstate.getIn([...dataPath,'children']);
            newList.push(newInput);
        }else{
            newList = [newInput];
        }
        this.newstate = this.newstate.setIn([...dataPath,'children'],newList);
        
        this.setState({
            labels : this.newstate.toJS(),
        })
        console.log(dataPath)
    }

    deleteSelf = (dataPath) => {
        let index = dataPath.pop();
        if(dataPath.length === 0){
            let newList = this.state.labels.slice();
            console.log(this.state.labels,newList,'be')
            newList.splice(index,1); 
            this.newstate = fromJS(newList);
            this.setState({
                labels : this.newstate.toJS(),
            })
        }else{
            let newList = this.newstate.getIn([...dataPath]);
            console.log(this.newstate.getIn([...dataPath]))
            newList.splice(index,1);
            this.newstate = this.newstate.setIn([...dataPath],newList);
            // this.newstate = fromJS(this.state.labels);
            this.setState({
                labels : this.newstate.toJS(),
            })
        }
        console.log(dataPath)
    }
    renderTree = (node,path=[]) => {
        if(node === undefined){
            return;
        }
        return (
          <div>
            {node.map( (item,index) => {
                    path.push(index,'children');
                    var nowPath = path.slice();
                    path.pop();
                    path.pop();
                    var dataPath = nowPath.slice();
                    dataPath.pop();
                    // console.log('node',path,this.newstate.getIn(["labels"]));

                    return <div style={{marginLeft:'20px'}} key={item.labelValue}>
                                <Item 
                                    change={this.inputChange}
                                    append={this.appendChild}
                                    delete={this.deleteSelf}
                                    path={dataPath} 
                                    value={this.newstate.getIn([...dataPath,"labelName"])}
                                />
                                {/* {console.log(item.children)} */}
                                {this.renderTree(item.children,nowPath)}
                            </div>
                })
            }
        </div>  
        )
    }

    addCategory = () => {
        this.el.addEventListener('blur',() => {
            console.log(this.el.value)
            this.setState({
                category:this.el.value,
            })
            // console.log(this.el.value,this.state.category)
        })
    }
    
    changeShowState = (boolean,send) => {
        if(send){
            this.props.changeCategory(this.state.category,this.state.labels);
        }
        
        this.setState({
            category: '',
            labels:[],
            show: boolean,
        });
        this.newstate = fromJS(this.state.labels);
    }
    
    componentDidMount() {
       
    }
    showEl = () => {
        console.log('show',this.state.show)
        if(this.state.show === true){
            return <div style={{position:"absolute",width:'80%',top:'20%',left:'10%',backgroundColor:'gray'}}>
            <h2>添加题目</h2>
            <button style={{position:'absolute',top:'10px',right:'10px'}} onClick={() =>this.changeShowState(false,true) }>X</button>
            <div>
                <label>分类名：
                    <input ref={el => this.el = el} style={{width:'60%'}}></input>
                </label>
            </div>
            <div>
                <div>
                    <label style={{float:'left',marginLeft:'16%'}}>类别：</label>
                    <div style={{display:'inline-block',marginLeft:'-32.6%',marginBottom:'10px'}}>
                        {/* {console.log(this.state,'saa')} */}
                        {this.renderTree(this.newstate.toJS())}
                    </div>
                </div>
            </div>
            <div onClick={this.appendFist}>+添加一级类别</div>
            <div>
                <button onClick={() =>this.changeShowState(false,true) }>确认</button>
                <button onClick={() =>this.changeShowState(false,false) }>取消</button>
            </div>
        </div>
        }
    }
    componentDidUpdate () {
        if(this.el){
            this.addCategory();
        }
    }
    render() {
        return(
            <div className='left' style={{float:'left'}}>
                <div className='left-top'></div>
                <div className='left-middle'>
                    <div >
                        <div onClick={() => this.changeShowState(true,false)}>+添加题目</div>
                        <div>题目设置</div>
                    </div>
                    {this.showEl()}
                    
                </div>
                <div className='left-bottom'></div>
            </div>
        );
    }
}

export default Left;