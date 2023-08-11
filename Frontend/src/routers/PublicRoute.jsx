import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

//로그인 안한 유저만 접근 가능.
// EX) 로그인, 회원가입 페이지
function PublicRoute() {
  const user = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  // 로그인이 돼 있으면 그냥 메인 페이지로 이동
  return user != null ? <Navigate to="/" /> : <Outlet />
}

export default PublicRoute
