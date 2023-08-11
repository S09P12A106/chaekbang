import { backApiInstance, jwtBackApiInstance } from './http'
// 유저 조회 수정 등

// const http = backApiInstance()
const jwtHttp = jwtBackApiInstance()

export const getUserInfoApi = async () => {
  const URL = '/api/users/info'
  const response = await jwtHttp.get(URL)
  return response.data
}
