import { combineReducers } from 'redux-immutable'
import { headerReducer } from '../views/header/store'
import { viewsReducer } from '../views/store'
import { homeReducer } from '../views/home/store'
import { wikiReducer } from '../views/wiki/store'
import { subReducer } from '../views/subscription/store'
import { collectionReducer } from '../views/collection/store'
import { loginReducer } from '../views/login/store'

export default combineReducers({
  header: headerReducer,
  views: viewsReducer,
  home: homeReducer,
  wiki: wikiReducer,
  sub: subReducer,
  collection: collectionReducer,
  login: loginReducer
})