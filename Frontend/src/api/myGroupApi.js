import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

export const getMyGroupsApi = async () => {
  const URL = '/api/groups/my-groups'
  return (await jwtHttp.get(URL)).data
}

export const getMyApplicationGroupApi = async () => {
  const URL = '/api/groups/my-applications'
  return (await jwtHttp.get(URL)).data
}

export const getMyHistoryGroupsApi = async () => {
  const URL = '/api/groups/my-history'
  return (await jwtHttp.get(URL)).data
}
