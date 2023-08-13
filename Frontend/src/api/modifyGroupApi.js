import axios from 'axios'
import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function patchGroup(data, groupId) {
  const URL = `/api/groups/${groupId}`
  const response = await jwtHttp.patch(URL, data)
}

export default patchGroup
