import { combineReducers } from 'redux'
import notice from './notice.reducer'
import auth from './auth.reducer'

export default combineReducers({
  notice,
  auth,
})