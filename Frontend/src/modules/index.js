import { combineReducers } from 'redux'
import { loginReducer } from '../store/LoginUser'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['loginReducer'],
}

const rootReducer = combineReducers({ loginReducer })

export default persistReducer(persistConfig, rootReducer)
