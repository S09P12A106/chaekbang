/**
 * 입력으로 들어온 미팅이 현재 활성화 된 미팅인지 boolean으로 반환합니다.
 * @param {Object} meeting
 * @returns {boolean}
 */
function isActivatedMeeting(meeting) {
  const meetingActivatedTime = computeMeetingActivatedTime(meeting.startedAt)
  const now = new Date()

  return meeting.closedAt === '' && now >= meetingActivatedTime
}

/**
 * 미팅이 활성화 되는 시간을 담은 Date 객체를 반환합니다.
 * @param {String} startedAt
 * @returns {Date}
 */
function computeMeetingActivatedTime(startedAt) {
  const meetingActivatedTime = new Date(startedAt)
  meetingActivatedTime.setMinutes(meetingActivatedTime.getMinutes() - 10)
  return meetingActivatedTime
}

export { isActivatedMeeting, computeMeetingActivatedTime }
