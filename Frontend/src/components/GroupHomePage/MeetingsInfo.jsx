import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import CurrentMeeting from './CurrentMeeting'
import MeetingList from './MeetingList'
import { isActivatedMeeting } from './dateCalculator'
import { GROUP_DETAIL_CONTAINER_PADDING } from '../GroupDetailPage/constant/groupDetailConstant'
import { getMeetingList } from '../../api/groupHomeApi'
import CONSOLE from '../../utils/consoleColors'

const PAGE_SIZE = 5
let observer

const MeetingsInfo = () => {
  const [meetingsData, setMeetingsData] = useState([])
  const [target, setTarget] = useState(null) // 관찰대상 target
  const [isLoaded, setIsLoaded] = useState(false)
  const [stop, setStop] = useState(false)
  const pageNum = useRef(-1)

  const { groupId } = useParams()
  const navigate = useNavigate()

  // <설정> meetings 데이터가 변경될시
  useEffect(() => {
    setIsLoaded(false)
    pageNum.current++
  }, [meetingsData])

  // <설정> isLoaded가 true이면 데이터를 받아온다.
  useEffect(() => {
    if (isLoaded) {
      getMeetingList(groupId, PAGE_SIZE, pageNum.current)
        .then(({ data }) => {
          if (data.data.length < PAGE_SIZE) {
            setStop(true)
          }
          setMeetingsData((meetings) => meetings.concat(data.data))
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            navigate('/login')
          } else {
            navigate('/error')
          }
        })
    }
  }, [isLoaded])

  // <설정> 화면 감지 옵션
  const intersectionOption = {
    root: null,
    threshold: 0.5,
    rootMargin: '0px',
  }

  // 1. 초기 데이터를 가져온다.
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // 2. 감지할 시 실행될 콜백함수 정의
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      // 데이터 불러오기
      setIsLoaded(true)
      observer.observe(entry.target)
    }
  }

  // 3. IntersectionObserver 설정
  useEffect(() => {
    let observer
    if (target && !stop) {
      observer = new IntersectionObserver(onIntersect, intersectionOption)
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [isLoaded, stop, target])
  if (!meetingsData) return null

  const currentMeetingIndex = findCurrentMeeting(meetingsData)

  const currentMeetingInfo = {
    isActivatedMeetingExist: currentMeetingIndex !== -1,
    currentMeetingIndex: currentMeetingIndex,
  }

  return (
    <MeetingListContainer>
      <CurrentMeeting
        currentMeetingInfo={currentMeetingInfo}
        meetings={meetingsData}
        groupId={groupId}
      />
      <MeetingList meetings={meetingsData} />
      {isLoaded ? <p>Loading....</p> : <div ref={setTarget}></div>}
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
