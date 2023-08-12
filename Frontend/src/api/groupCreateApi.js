import axios from 'axios'
import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function postGroup(groupData) {
  const URL = '/api/groups'
  await jwtHttp.post(URL, groupData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    withCredentials: true,
  })
}
export default postGroup
