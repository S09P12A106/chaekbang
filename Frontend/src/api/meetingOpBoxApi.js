import { jwtBackApiInstance, backApiInstance } from './http'

const jwtApi = jwtBackApiInstance()
const test = backApiInstance()
// 의견모집함 생성
async function createOpBox(group_id, meeting_id, topic) {
  await jwtApi.post(
    `api/groups/${group_id}/meetings/${meeting_id}/opinion-box`,
    { topic: topic },
  )
}

// 의견 보내기
async function sendOpinion(group_id, meeting_id, opinion_box_id, opinion) {
  await jwtApi.post(
    `api/groups/${group_id}/meetings/${meeting_id}/opinion-box/${opinion_box_id}/opinion`,
    {
      opinion: opinion,
    },
  )
}

// 데이터 가져오기
async function getOpBox(group_id, meeting_id) {
  return await jwtApi.get(
    `/api/groups/${group_id}/meetings/${meeting_id}/opinions`,
  )
}

export { createOpBox, sendOpinion, getOpBox }
