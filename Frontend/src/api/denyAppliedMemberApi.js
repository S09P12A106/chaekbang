import axios from 'axios'
import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function denyAppliedMember(groupId, userId) {
  const URL = `api/groups/${groupId}/leaders/applications?userId=${userId}`
  await jwtHttp.delete(URL)
}

export default denyAppliedMember
