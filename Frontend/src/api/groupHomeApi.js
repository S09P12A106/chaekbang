import { jwtBackApiInstance } from './http'

const jwtApi = jwtBackApiInstance()

async function leaveGroup(groupId) {
  await jwtApi.delete(`api/groups/${groupId}/members`)
}

/**
 * pageSize만큼의 meeting 정보를 가져올 수 있습니다. 정한 pageSize만큼 페이지 번호가 나뉘게 되고 나뉜 페이지 중 pageNum번째의 페이지에 대한 meeting 정보들을 가져옵니다.
 * @param {int} groupId group id
 * @param {int} pageSize 한번에 가져올 meeting 수
 * @param {int} pageNum 페이지 번호
 * @returns
 */
async function getMeetingList(groupId, pageSize, pageNum) {
  return await jwtApi.get(
    `api/groups/${groupId}/meetings?pageSize=${pageSize}&pageNum=${pageNum}`,
  )
}

export { leaveGroup, getMeetingList }
