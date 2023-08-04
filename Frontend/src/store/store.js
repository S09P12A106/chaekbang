import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../modules'
import { rootApi } from '../api/rootApi'

export const store = configureStore({
  reducer: {
    rootReducer,
    // 특정 top-level slice에서 생성된 리듀서를 추가
    [rootApi.reducerPath]: rootApi.reducer,
  },
  // 캐싱, 요청 취소, 폴링 등등 유용한 rtk-query의 기능들을 위한 api 미들웨어 추가
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rootApi.middleware),
})
