import { Publisher } from 'openvidu-browser'

/**
 * Publisher의 닉네임을 반환합니다.
 * @param {Publisher} streamManager
 * @returns {string}
 */
function getNicknameTag(streamManager) {
  return JSON.parse(streamManager.stream.connection.data).clientData
}

async function findCurrentVideoDevice(OV, publisher) {
  const devices = await OV.getDevices()
  const videoDevices = devices.filter((device) => device.kind === 'videoinput')
  const currentVideoDeviceId = publisher.stream
    .getMediaStream()
    .getVideoTracks()[0]
    .getSettings().deviceId
  return videoDevices.find((device) => device.deviceId === currentVideoDeviceId)
}

export { getNicknameTag, findCurrentVideoDevice }
