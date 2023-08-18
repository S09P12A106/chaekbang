import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { styled } from 'styled-components'
import SideBar from '../components/meetingRoom/SideBar'
import TopSpace from '../components/meetingRoom/screen/TopSpace'
import ScreenShot from '../components/meetingRoom/screen/ScreenShot'
import BottomBtns from '../components/meetingRoom/screen/BottomBtns'
import { BoardContext } from '../components/meetingRoom/context/BoardContext'
import COLORS from '../constants/colors'
import CONSOLE from '../utils/consoleColors'
import { convertTime } from '../components/meetingRoom/sideBoard/timer/convertTime'
import { Stomp } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { SocketContext } from '../modules/SocketContext'
import { getAccessToken } from '../utils/tokenUtil'
import { emojiSUB } from '../utils/socket/emojiSUB'
import { voteSUB } from '../utils/socket/voteSUB'
import { votePUB } from '../utils/socket/votePUB'

function MeetingRoomPage({
  meetingInfoState,
  videoOption,
  toggleMic,
  toggleCam,
  isTogglePossible,
  setIsTogglePossible,
}) {
  const [meetingInfo, setMeetingInfo] = meetingInfoState
  const [whichBtn, setWhichBtn] = useState(0)
  const [currentTime, setCurrentTime] = useState([])

  // MeetingRoom에 들어오거나 Publisher가 변경되었을 때 접속자 본인 영상 publish
  useEffect(() => {
    setIsTogglePossible(false) // MeetingPage의 useEffect(()=>{},[isTogglePossible]) 로 갑니다!
  }, [meetingInfo.publisher])

  // -------------- socket 관한 코드 --------------
  const apiURL = process.env.REACT_APP_APPLICATION_SERVER_URL
  const wsUrl = `${apiURL}/ws/chaekbang`

  const client = useRef(null)
  const [getEmoji, setGetEmoji] = useState([])
  const [getVote, setGetVote] = useState([])

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const meetingId = queryParams.get('meetingId')

  // socket 연결
  const connectHaner = () => {
    client.current = Stomp.over(() => {
      const sock = new SockJS(wsUrl)
      return sock
    })
    client.current.connect(
      {
        Authorization: `Bearer ${getAccessToken()}`,
        meeting: meetingId,
      },
      () => {
        // emojiSUB
        emojiSUB(client, setGetEmoji, meetingId)
        // vote
        voteSUB(client, setGetVote, meetingId)
        votePUB(client, meetingId)
      },
    )
  }

  useEffect(() => {
    connectHaner()
  }, [])

  // -------------- socket 끝 --------------

  return (
    <BoardContext.Provider
      value={{
        whichBtn,
        setWhichBtn,
        meetingInfoState,
        videoOption,
        toggleMic,
        toggleCam,
        currentTime,
        meetingId,
      }}
    >
      <SocketContext.Provider
        value={{
          client: client.current,
          EmojiInfo: { emoji: getEmoji.emoji, nickname: getEmoji.nickname },
          voteInfo: getVote,
        }}
      >
        <Container>
          {/* 오른쪽 사이드 바는 상시 고정 */}
          <SideBarContainer>
            <SideBar></SideBar>
          </SideBarContainer>
          {/* 왼쪽 스크린은 크게 위 여유공간 / 스크린 / 하단 버튼으로 세부분으로 나뉜다 */}
          <ScreenContainer>
            <TopSpace></TopSpace>
            {/* 스크린을 보여주는 컴포넌트 > 그리드가 있어야함 */}
            <ScreenShot></ScreenShot>
            <BottomBtns isTogglePossible={isTogglePossible}></BottomBtns>
          </ScreenContainer>
        </Container>
      </SocketContext.Provider>
    </BoardContext.Provider>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  background-color: ${COLORS.BLACK};
`
const SideBarContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
`

const ScreenContainer = styled.div`
  display: flex;
  // flex-grow: 1;
  // flex-shrink: 0;
  flex: 1;
  flex-direction: column;
  transition: all 0.5s ease;
`

export default MeetingRoomPage
