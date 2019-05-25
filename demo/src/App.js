import React, { Component } from 'react';
import './App.css';
import Right from './Right';
import Left from './Left';

var pagestate = {
	"category": "test",
	"labels": [{
		"labelName": "1",
		"labelValue": "1",
		"children": [{
			"labelName": "11",
			"labelValue": "11",
			"children": [{
				"labelName": "111",
				"labelValue": "111",
				"children": [{
					"labelName": "1111",
					"labelValue": "1111",
				}, {
					"labelName": "1112",
					"labelValue": "1112",

					"children": [{
						"labelName": "11121",
						"labelValue": "11121",
					}]
				}, {
					"labelName": "1113",
					"labelValue": "1113",
				}]
			}, {
				"labelName": "112",
				"labelValue": "112",
			}]
		}, {

			"labelName": "12",
			"labelValue": "12",

			"children": [{
				"labelName": "121",
				"labelValue": "121",
			}, {
				"labelName": "122",
				"labelValue": "122",
			}]
		}, {
			"labelName": "13",
			"labelValue": "13",
			"children": [{
				"labelName": "131",
				"labelValue": "131",
			}]
		}]
	}, {
		"labelName": "2",
		"labelValue": "2",
	}, {
		"labelName": "3",
		"labelValue": "3",
	}]
}

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
		pagestate:pagestate,
	};
  }

  changeCategory = (category,labels) => {
	// console.log(newData,this.state.pagestate);
	let newData = {
		category: category,
		labels:labels,
	}
	this.setState({
		pagestate : newData,
	})
  }

  render() {
    return (
      <div className="App">
		 <Left changeCategory={this.changeCategory}/>
         <Right state = {this.state.pagestate}/>
      </div>
    );
  }
  
}

export default App;
