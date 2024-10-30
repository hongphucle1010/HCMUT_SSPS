import { combineReducers } from 'redux'
import authorizationReducer from './userState'
import printingReducer from './printingState'

const rootReducer = combineReducers({
  user: authorizationReducer,
  printingState: printingReducer
})

export default rootReducer
