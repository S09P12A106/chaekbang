import { backApiInstance } from './http'

// 카카오 로그인 ~ 회원가입, 로그아웃, 회원탈퇴 등 API 연동 예정

const http = backApiInstance()

export const loginApi = async (data) => {
  const URL = '/api/users/sign-in'

  return (await http.post(URL, data)).data
}

export const signUpApi = async (data) => {
  const URL = '/api/users'

  return (await http.post(URL, data)).data
}
