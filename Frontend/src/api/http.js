import axios from 'axios'

// 추후 환경변수에서 관리
const apiURL = 'URL'

const defaultHeader = {
  'Content-Type': 'application/json;charset=utf-8',
}

/**
 * 백앤드 서버와 통신을 위한 axios api 인스턴스를 생성합니다.
 * 헤더의 기본 Content-Type은 application/json;charset=utf-8로 설정되어 있고 추가적인 header 정보를 받을 수 있습니다.
 * @param {Object} additionalHeader
 * @returns
 */
function backApiInstance(additionalHeader) {
  const instance = axios.create({
    baseURL: apiURL,
    Headers: {
      ...defaultHeader,
      ...additionalHeader,
    },
  })
  return instance
}

/**
 * 외부 api 통신을 위한 axios 인스턴스를 생성합니다. api에 사용될 baseUrl을 입력으로 받습니다.
 * 헤더의 기본 Content-Type은 application/json;charset=utf-8로 설정되어 있고 추가적인 header 정보를 받을 수 있습니다.
 * @param {String} baseUrl
 * @param {Object} additionalHeader
 * @returns
 */
function apiInstance(baseUrl, additionalHeader) {
  const instance = axios.create({
    baseURL: baseUrl,
    Headers: {
      ...defaultHeader,
      ...additionalHeader,
    },
  })
  return instance
}

export { apiInstance, backApiInstance }
