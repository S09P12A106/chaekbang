import React from 'react'
import styled from 'styled-components'
import MeetingsByDate from './MeetingsByDate'

const MeetingList = ({ meetings }) => {
  const groupedMeetings = groupMeetingsByStartDate(meetings)

  return (
    <div>
      {/* 
      1. Object.entries 각 요소의 0번 인덱스는 Key, 즉 여기서 날짜
      2. 각 요소의 1번 인덱스는 value, 여기서는 해당 날짜의 미팅 배열 */}
      {Object.entries(groupedMeetings).map((meetingPerDay, index) => {
        return (
          <MeetingsByDate
            key={index}
            date={meetingPerDay[0]}
            meetings={meetingPerDay[1]}
          />
        )
      })}
    </div>
  )
}

/**
 * 책방들의 정보를 받아 시작날짜 별로 그룹화해 리턴합니다.
 ```
  {
    "2023-07-14" : [
      {
      title: '말포이의 관점에서 바라본 해리포터',
      startedAt: '2023-07-14 11:00:00',
      closedAt: '2023-07-14 13:00:00',
      },
      {
        title: '너에게 난 나에게 넌',
        startedAt: '2023-07-14 15:00:00',
        closedAt: '2023-07-14 16:00:00',
      },
    ]
  }
```
 * @param {*} meetings
 * @returns {Object}
 */
function groupMeetingsByStartDate(meetings) {
  const groupedMeetings = meetings.reduce((result, meeting) => {
    const startDate = getDateString(meeting.startedAt)

    if (startDate in result) {
      result[startDate].push(meeting)
    } else {
      result[startDate] = [meeting]
    }
    return result
  }, {})

  return groupedMeetings
}

/**
 * 날짜값을 YYYY-MM-dd HH:mm:ss 형식으로 받아서 날짜에 해당하는 YYYY-MM-dd를 리턴합니다.
 * @param {String} datetime
 * @returns {String}
 */
function getDateString(datetime) {
  return datetime.split(' ')[0]
}

export default MeetingList
