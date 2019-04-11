import React, { Component } from 'react';
import {GlobalStyled} from './style.js';
import Header from './common/header';
import { Provider } from 'react-redux';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <GlobalStyled />
        <Header />
      </Provider>
    );
  }
}

export default App;
