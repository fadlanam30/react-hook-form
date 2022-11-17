import { combineReducers } from 'redux'
import { baseAPI } from '../../services/_baseAPI'
import AuthReducer from './AuthReducer'
import TodoReducer from './TodoReducer'

const allReducers = combineReducers({
  todo: TodoReducer,
  auth: AuthReducer,
  api: baseAPI.reducer
})

export default allReducers
