// 액션 타입 정의
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

// 초기 상태
const initialState = {
  user: null,
}

// 액션 생성자 함수
export const loginAction = (data) => ({
  type: LOGIN,
  payload: data,
})

export const logoutAction = () => ({
  // 로그아웃 액션 생성자 함수 추가
  type: LOGOUT,
})

// 리듀서
export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: {
          ...action.payload,
        },
      }
    case LOGOUT:
      return {
        ...state,
        user: null,
      }

    default:
      return state
  }
}
