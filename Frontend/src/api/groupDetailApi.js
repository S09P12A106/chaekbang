import { backApiInstance, jwtBackApiInstance } from './http'

const backApi = backApiInstance()
const jwtApi = jwtBackApiInstance()

async function getGroupDetail(groupId, success, fail) {
  await backApi.get(`/api/groups/${groupId}`).then(success).catch(fail)
}

async function getGroupMembers(groupId, success, fail) {
  await backApi.get(`/api/groups/${groupId}/members`).then(success).catch(fail)
}

// 아래는 가입된 유저만 사용할 수 있는 api

async function joinGroup(groupId, answer) {
  await jwtApi.post(`api/groups/${groupId}/applications`, {
    answer: answer,
  })
}

async function isAppliedUser(groupId) {
  return await jwtApi.get(`api/groups/${groupId}/status`)
}

async function cancelApplication(groupId) {
  await jwtApi.delete(`api/groups/${groupId}/applications`)
}

export {
  getGroupDetail,
  getGroupMembers,
  joinGroup,
  isAppliedUser,
  cancelApplication,
}
