const ACCESS_TOKEN_KEY = 'accessToken'
const REFRESH_TOKEN_KEY = 'refreshToken'

export const saveToken = (accessToken, refreshToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const clearToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const getAccessToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  if (!token) {
    return null
  }
  return token
}

export const getRefreshToken = () => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY)
  if (!token) {
    return null
  }
  return token
}
