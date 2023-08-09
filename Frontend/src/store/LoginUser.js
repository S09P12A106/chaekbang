// 액션 타입 정의
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const NICKNAME = 'NICKNAME'

// 초기 상태
const initialState = {
  isLogin: false,
  nickname: '',
}

// 액션 생성자 함수
export const login = () => ({
  type: LOGIN,
})

export const setNickname = (nickname) => {
  return {
    type: NICKNAME,
    payload: nickname,
  }
}

export const logout = () => ({
  // 로그아웃 액션 생성자 함수 추가
  type: LOGOUT,
})

// 리듀서
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      }
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      }
    case NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      }
    default:
      return state
  }
}
