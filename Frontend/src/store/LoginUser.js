import { createStore } from 'redux'

// 액션 타입 정의
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// 초기 상태
const initialState = {
  isLogin: false,
}

// 리듀서
const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { isLogin: true }
    case LOGOUT:
      return { isLogin: false }
    default:
      return state
  }
}

// 리덕스 스토어 생성
const store = createStore(loginReducer)

export default store
