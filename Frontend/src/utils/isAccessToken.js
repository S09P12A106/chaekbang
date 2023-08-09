import axios from 'axios'

export const isAccessToken = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const BASE_URL = 'http://localhost:8080/api'

  if (accessToken) {
    return true
  } else {
    const refreshToken = localStorage.getItem('refreshToken')

    try {
      const response = await axios.post(BASE_URL + '/users/refresh', {
        refreshToken,
      })

      const newAccessToken = response.data.accessToken
      localStorage.setItem('accessToken', newAccessToken)

      // 재시도
      return isAccessToken()
    } catch (refreshError) {
      // refresh Token이 만료 혹은 오류
      return false
    }
  }
}

export default isAccessToken
