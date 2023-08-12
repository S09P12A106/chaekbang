import axios from 'axios'
import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function approveAppliedMember(groupId, userId) {
  const URL = `api/groups/${groupId}/leaders/applications?userId=${userId}`
  await jwtHttp.patch(URL, {}, {})
}

export default approveAppliedMember
