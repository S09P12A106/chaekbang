import { combineReducers } from 'redux'
import { loginReducer } from '../store/LoginUser'
import { sessionIdReducer } from '../store/sessionIdReducer'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer', 'sessionIdReducer'],
}

const rootReducer = combineReducers({ loginReducer, sessionIdReducer })

export default persistReducer(persistConfig, rootReducer)
