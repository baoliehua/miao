import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import Header from './views/header'
import Views from './views'
import ScrollTop from './components/scrollTop'
import { GlobalStyle } from './style'
import store from './store'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNighttime: false,
      nighttimeStyle: {
        borderColor: '#2f2f2f',
        backgroundColor: '#4f4f4f',
        themeColor: '#3f3f3f',
        fontColor: '#c8c8c8',
        detailColor: '#c8c8c8',
        tagStyle: {
          color: '#969696',
          hoverColor: '#c8c8c8',
          borderColor: '#545454',
          hoverBorderColor: '#a5a5a5'
        }
      },
      daytimeStyle: {
        borderColor: '#f0f0f0',
        backgroundColor: '#eee',
        themeColor: '#fff',
        fontColor: '#333',
        detailColor: "#787878",
        tagStyle: {
          color: '#787878',
          hoverColor: '#333',
          borderColor: '#ddd',
          hoverBorderColor: '#b4b4b4'
        }
      }
    }
    this.changeTimeStatus = this.changeTimeStatus.bind(this)
  }
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider
          theme={ this.state.isNighttime
            ? this.state.nighttimeStyle
            : this.state.daytimeStyle
          }
        >
        <Router>
          <Fragment>
            <Header
              isNighttime={this.state.isNighttime}
              changeTimeStatus={this.changeTimeStatus}
            />
            <Route
              path={`${process.env.PUBLIC_URL}/`}
              component={Views}
            />
            <ScrollTop></ScrollTop>
            { this.state.isNighttime
              ? <GlobalStyle nighttime />
              : <GlobalStyle />
            }
          </Fragment>
        </Router>
        </ThemeProvider>
      </Provider>
    )
  }
  changeTimeStatus(isNighttime) {
    this.setState({
      isNighttime
    })
  }
}

export default App
