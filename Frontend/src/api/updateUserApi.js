import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()
async function patchUser(data) {
  const URL = `api/users`
  const response = await jwtHttp.patch(URL, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
  return response
}

export default patchUser
