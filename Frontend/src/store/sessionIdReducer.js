// 액션 타입 정의
const SAVE = 'SAVE'

// 액션 생성자 함수
const saveSessionId = (sessionId) => ({
  type: SAVE,
  sessionId: sessionId,
})

const initialState = {
  sessionId: -1,
}

// reducer
const sessionIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE:
      return {
        ...state,
        sessionId: action.sessionId,
      }
    default:
      return state
  }
}

export { saveSessionId, sessionIdReducer }
