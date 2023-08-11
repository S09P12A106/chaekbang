import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// 로그인 한 유저만 접근 가능.

function PrivateRoute() {
  const user = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  // user 로그인이 안돼있으면 로그인 페이지로 이동
  return user == null ? <Navigate to="/login" /> : <Outlet />
}

export default PrivateRoute
