import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import CurrentMeeting from './CurrentMeeting'
import MeetingList from './MeetingList'
import { isActivatedMeeting } from './dateCalculator'
import { sampleMeetings } from '../GroupDetailPage/sampleData'
import { GROUP_DETAIL_CONTAINER_PADDING } from '../GroupDetailPage/constant/groupDetailConstant'
import { getSampleData } from '../../api/tempApi'

const meetings = sampleMeetings.meetings
const currentMeetingIndx = findCurrentMeeting(meetings)

const MeetingsInfo = () => {
  const [meetingsData, setMeetingsData] = useState([])
  const [offsetMeetingData, setoffsetMeetingData] = useState(0)
  const [target, setTarget] = useState(null) // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [stop, setStop] = useState(false)

  useEffect(() => {
    let observer
    if (target && !stop) {
      // callback 함수로 onIntersect를 지정
      observer = new IntersectionObserver(onIntersect, {
        threshold: 1,
      })
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target, isLoaded])

  const getMoreItem = async () => {
    // 데이터를 받아오도록 true 로 변경
    getSampleData(
      '/meetings',
      ({ data }) => {
        console.log('api called!!!')
        setMeetingsData((meetings) => meetings.concat(data))
        setoffsetMeetingData((offset) => offset + data.length)

        if (data.length < 2) {
          setStop(true)
        }
      },
      (error) => {
        setError(error)
      },
    )
  }

  const onIntersect = async ([entry], observer) => {
    // entry 요소가 교차되거나 Load중이 아니면
    if (entry.isIntersecting && !isLoaded) {
      // 관찰은 일단 멈추고
      observer.unobserve(entry.target)
      // 데이터 불러오기
      await getMoreItem()

      // 불러온 후 다시 관찰 실행
      observer.observe(entry.target)
    }
  }

  if (isLoaded) return <div>로딩중..</div>
  if (error) return <div>에러가 발생했습니다</div>
  if (!meetingsData) return null

  return (
    <MeetingListContainer>
      <CurrentMeeting currentMeetingIndex={currentMeetingIndx} />
      <MeetingList meetings={meetingsData} />
      <div ref={setTarget}></div>
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
