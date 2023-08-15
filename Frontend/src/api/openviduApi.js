import { jwtBackApiInstance } from './http'

const additionalBaseUrl = `/api/openvidu/sessions/`

const api = jwtBackApiInstance()

async function createSession(sessionId) {
  const response = await api.post(additionalBaseUrl, {
    customSessionId: sessionId,
  })
  return response.data
}

async function createToken(sessionId) {
  const response = await api.post(
    additionalBaseUrl + sessionId + '/connections',
    {},
  )
  return response.data
}

export { createSession, createToken }
