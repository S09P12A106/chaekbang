import axios from 'axios'
import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function deleteJoinedMember(groupId, userId) {
  const URL = `api/groups/${groupId}/leaders/members?userId=${userId}`
  await jwtHttp.delete(URL)
}

export default deleteJoinedMember
