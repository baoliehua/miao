import React, { Component } from 'react';
import {GlobalStyled} from './style.js';
import Header from './common/header';
import Pages from './pages/home';
import Detail from './pages/detail/loadable';
import Login from './pages/login';
import Write from './pages/write';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter , Route } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <GlobalStyled />
        <BrowserRouter>
            <Header />
            <Route path='/' exact component={Pages}></Route>
            <Route path='/detail/:id' exact component={Detail}></Route>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/write' exact component={Write}></Route>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
