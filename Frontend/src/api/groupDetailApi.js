import { apiInstance, backApiInstance } from './http'

const api = apiInstance()
const backApi = backApiInstance()

async function getGroupDetail(groupId, success, fail) {
  await backApi.get(`/api/group/${groupId}`).then(success).catch(fail)
}

async function getGroupMembers(groupId, success, fail) {
  await backApi.get(`/api/group/${groupId}/members`).then(success).catch(fail)
}

export { getGroupDetail, getGroupMembers, getSampleStr }
