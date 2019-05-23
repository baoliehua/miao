import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducer'

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(reduxThunk)
  // other store enhancers if any
))

export default store