export const logout = (navigate) => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')

  navigate('/')
}
