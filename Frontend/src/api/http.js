import axios from 'axios'
import { AxiosInstance } from 'axios'
import {
  clearToken,
  getAccessToken,
  getRefreshToken,
  saveToken,
} from '../utils/tokenUtil'

// 추후 환경변수에서 관리
const apiURL = process.env.REACT_APP_APPLICATION_SERVER_URL

const defaultHeader = {
  'Content-Type': 'application/json;charset=utf-8',
}

/**
 * 백앤드 서버와 통신을 위한 axios api 인스턴스를 생성합니다.
 * @returns { AxiosInstance }
 */
function backApiInstance() {
  const instance = axios.create({
    baseURL: apiURL,
  })
  return instance
}

function jwtBackApiInstance() {
  const instance = axios.create({
    baseURL: apiURL,
    withCredentials: true,
  })

  instance.interceptors.request.use(
    (request) => {
      const accessToken = getAccessToken()
      request.headers['Authorization'] = `Bearer ${accessToken}`
      return request
    },
    (error) => {
      return Promise.reject(error)
    },
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },

    async (error) => {
      // 401 에러를 받은 경우
      if (error.response && error.response.status === 401) {
        const refreshToken = getRefreshToken()
        // 현재 클라이언트에게 refresh 토큰이 없으면 종료
        if (!refreshToken) {
          clearToken()
          return Promise.reject(error)
        }

        const accessToken = getAccessToken()
        try {
          // refresh 토큰이 있다면 재 요청.
          const refreshResponse = await refreshApi(accessToken, refreshToken)
          const { accessToken: newAccessToken } = refreshResponse.data
          //새 토큰 저장
          saveToken(newAccessToken, refreshToken)
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`
          // 기존 요청 재요청
          const response = await axios.request(error.config)
          return response
        } catch (e) {
          // 리프레시 요청 || 재 요청 과정에서 에러가 발생하면..
          if (e.response && e.response.status === 401) {
            clearToken() // 토큰 초기화
          }
          return Promise.reject(e)
        }
      }
      //401 에러가 아닌 경우 그대로 리턴한다.
      return Promise.reject(error)
    },
  )
  return instance
}

/**
 * 외부 api 통신을 위한 axios 인스턴스를 생성합니다. api에 사용될 baseUrl을 입력으로 받습니다.
 * @param {String} baseUrl
 * @returns { AxiosInstance }
 */
function apiInstance(baseUrl) {
  const instance = axios.create({
    baseURL: baseUrl,
  })
  return instance
}

const refreshApi = async (accessToken, refreshToken) => {
  const URL = apiURL + '/api/users/refresh'
  const requestBody = {
    refreshToken,
  }
  const response = await axios.post(URL, requestBody, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return response.data
}

export { apiInstance, backApiInstance, jwtBackApiInstance }
