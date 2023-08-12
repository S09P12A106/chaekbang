import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

async function postMeeting(groupId, meetingData) {
  const URL = `api/groups/${groupId}/meetings`
  await jwtHttp.post(URL, meetingData, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export default postMeeting
