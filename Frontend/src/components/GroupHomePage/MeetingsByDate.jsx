import React from 'react'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import { isActivatedMeeting } from './dateCalculator'
import { useNavigate, useParams } from 'react-router-dom'

function joinMeeting(meetingId, groupId) {
  if (meetingId) {
    window.location.href = `/meeting?groupId=${groupId}&meetingId=${meetingId}`
  }
}

const [COMPLETED, ONGOING, SCHEDULED] = [0, 1, 2]

const buttonStyle = [
  {
    // completed : 0
    color: COLORS.THEME_COLOR4,
    label: '상세조회',
  },
  {
    //ongoing : 1
    color: COLORS.THEME_COLOR2,
    label: '참여하기',
  },
  {
    // scheduled : 2
    color: '#7b8489',
    label: '참여하기',
  },
]

const MeetingsByDate = ({ date, meetings }) => {
  const { groupId } = useParams()
  const ongoingMeetings = meetings.filter(
    (meeting) => findTypeOfMeeting(meeting) === ONGOING,
  )
  const navigate = useNavigate()

  const goToMeetingDetail = (meetingId) => {
    const url = `/groups/${groupId}/meetings/${meetingId}`
    navigate(url)
  }

  return (
    <Container>
      <DateBox>
        <DateStyleLine />
        <DateInfo>{getFormattedDate(date)}</DateInfo>
        <DateStyleLine />
      </DateBox>
      <GroupedMeetingContainer>
        {meetings.map((meeting, index) => {
          const type = findTypeOfMeeting(meeting)
          return (
            <MeetingContainer key={index}>
              <MeetingTitle>{meeting.title}</MeetingTitle>
              <Button
                color={buttonStyle[type].color}
                onClick={() => {
                  if (type === ONGOING) {
                    joinMeeting(ongoingMeetings[0].id, groupId)
                  } else if (type === COMPLETED) {
                    goToMeetingDetail(meeting.id)
                  }
                }}
              >
                {buttonStyle[type].label}
              </Button>
            </MeetingContainer>
          )
        })}
      </GroupedMeetingContainer>
    </Container>
  )
}

/**
 * 책방 리스트에 정해진 포맷의 날짜 형식을 문자열로 반환 합니다.
 * format : YYYY . MM . dd
 * @param {String} date
 * @returns {String}
 */
function getFormattedDate(date) {
  const dateObj = new Date(date)
  return `${dateObj.getFullYear()} . ${
    dateObj.getMonth() + 1
  } . ${dateObj.getDate()}`
}

/**
 * 입력으로 들어온 책방의 진행여부를 반환합니다. 완료(0), 진행중(1), 예약(2) 세 가지 상태로 반환되면 반환 타입은 정수형입니다.
 * @param {Object} meeting
 * @returns {int} 0: completed, 1: ongoing, 2: scheduled
 */
function findTypeOfMeeting(meeting) {
  if (meeting.closedAt) {
    return 0
  } else if (isActivatedMeeting(meeting)) return 1
  else return 2
}

const Container = styled.div`
  margin: 2rem 0;
`

const GroupedMeetingContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`

const DateBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 1rem 0;
`

const DateStyleLine = styled.div`
  flex: 1;
  height: 1px;
  /* position: absolute; */
  /* top: -50%; */
  background-color: #b4b4b4;
  margin: 0 1rem;
`

const DateInfo = styled.span`
  font-size: 0.9rem;
  color: #b4b4b4;
`

const MeetingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem auto;
`

const MeetingTitle = styled.span`
  font-size: 1.2rem;
`

const Button = styled.div`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.color};
  color: ${COLORS.WHITE};
  border-radius: 0.5rem;
`

export default MeetingsByDate
