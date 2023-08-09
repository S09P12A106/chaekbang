import axios from 'axios'

const getUserInfo = async () => {
  const accessToken = localStorage.getItem('accessToken')
  const BASE_URL = 'http://localhost:8080/api'

  try {
    const response = await axios.get(BASE_URL + '/user/info', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    // 유저정보 가져오기
    return response.data
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Access Token 만료. Refresh Token으로 새로운 Access Token 발급 시도
      const refreshToken = localStorage.getItem('refreshToken')
      try {
        const response = await axios.post(BASE_URL + '/users/refresh', {
          refreshToken,
        })

        const newAccessToken = response.data.accessToken
        localStorage.setItem('accessToken', newAccessToken)

        // 재시도
        await getUserInfo()
      } catch (refreshError) {
        // refresh Token이 만료 혹은 오류
        localStorage.removeItem('refreshToken')
        console.log('오류페이지로 이동')
      }
    } else {
      // refresh Token이 없음
      localStorage.removeItem('refreshToken')
      console.log('오류페이지로 이동')
    }
  }
}

export default getUserInfo
