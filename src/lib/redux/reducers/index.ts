import { combineReducers } from 'redux'
import authorizationReducer from './userState'

const rootReducer = combineReducers({
  user: authorizationReducer
})

export default rootReducer
