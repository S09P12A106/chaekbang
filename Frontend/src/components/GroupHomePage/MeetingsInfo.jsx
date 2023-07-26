import React from 'react'
import styled from 'styled-components'
import CurrentMeeting from './CurrentMeeting'
import MeetingList from './MeetingList'
import { isActivatedMeeting } from './dateCalculator'
import { sampleMeetings } from '../GroupDetailPage/sampleData'
import { GROUP_DETAIL_CONTAINER_PADDING } from '../GroupDetailPage/constant/groupDetailConstant'

const meetings = sampleMeetings.meetings
const currentMeetingIndx = findCurrentMeeting(meetings)

const MeetingsInfo = () => {
  return (
    <MeetingListContainer>
      <CurrentMeeting currentMeetingIndex={currentMeetingIndx} />
      <MeetingList meetings={meetings} />
    </MeetingListContainer>
  )
}

/**
 * 책방들의 정보를 받아 현재 활성화된 책방의 인덱스를 리턴합니다. 활성화된 인덱스가 없을시 -1을 return합니다.
 * @param {Array} meetings
 * @returns {int}
 */
function findCurrentMeeting(meetings) {
  return meetings.findIndex((meeting) => isActivatedMeeting(meeting))
}

const MeetingListContainer = styled.div`
  padding: ${GROUP_DETAIL_CONTAINER_PADDING};
  padding-top: 1px; // 하위 컴포넌트의 마진 겹침 현상 방지 padding
`

export default MeetingsInfo
