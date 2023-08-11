import { backApiInstance } from './http'

const authToken = 'authToken'

const additionalBaseUrl = `/api/openvidu/sessions/`

const header = {
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: `Bearer ${authToken}`,
  },
}

const api = backApiInstance()

async function createSession(sessionId) {
  const response = await api.post(
    additionalBaseUrl,
    {
      customSessionId: sessionId,
    },
    header,
  )
  return response.data
}

async function createToken(sessionId) {
  const response = await api.post(
    additionalBaseUrl + sessionId + '/connections',
    {},
    header,
  )
  return response.data
}

export { createSession, createToken }
