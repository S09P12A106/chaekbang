import axios from 'axios'
import { AxiosInstance } from 'axios'

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

export { apiInstance, backApiInstance }
