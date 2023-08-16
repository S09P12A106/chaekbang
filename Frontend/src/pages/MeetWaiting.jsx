import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { styled } from 'styled-components'
import ScreenContainer from '../components/meeting/waiting/ScreenContainer'
import ContextContainer from '../components/meeting/waiting/ContextContainer'
import MainLayout from '../components/Layout/MainLayout'
import { OpenVidu } from 'openvidu-browser'
import CONSOLE from '../utils/consoleColors'
import axios from 'axios'
import { createSession, createToken } from '../api/openviduApi'

// const OV = new OpenVidu()

let mySession

function MeetWaiting({
  meetingInfoState,
  videoOption,
  toggleMic,
  toggleCam,
  joinMeetingRoom,
}) {
  const [meetingInfo, setMeetingInfo] = meetingInfoState
  const isTokenRequested = useRef(false)
  const ovObj = useMemo(() => {
    const ov = new OpenVidu()
    return { OV: ov }
  }, [])
  const OV = ovObj.OV

  const loggedInUserNickname = useSelector((state) => {
    return state.rootReducer.loginReducer.user.nickname
  })

  // meetingInfo의 첫번째 변경
  useEffect(() => {
    CONSOLE.info('세션을 시작합니다.')
    setMeetingInfo((prevState) => ({
      ...prevState,
      session: OV.initSession(),
    }))
  }, [])

  /**
   * 아래의 useEffect는 meetingInfo의 변화를 감지할 때 실행됩니다.
   * 그런데 아래의 useEffect는 로직 내부에 setMeetingInfo을 사용해서 자칫 무한루프에 빠질 가능성이 있는 문제가 있습니다.
   * 따라서 아래의 로직이 실행될 때 isTokenRequested을 true로 바꿔서 처음 meetingInfo가 변경될 때만 수행하게 하고 두번째 변경부터는 아래의 useEffect 로직 수행을 막습니다.
   */
  useEffect(() => {
    if (meetingInfo.session && !isTokenRequested.current) {
      CONSOLE.info('서버에 토큰을 요청합니다.')
      isTokenRequested.current = true
      mySession = meetingInfo.session
      // On every Stream created...
      mySession.on('streamCreated', (event) => {
        CONSOLE.event('누군가 참여했습니다!')
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const subscriber = mySession.subscribe(event.stream, undefined)
        const subscribers = meetingInfo.subscribers
        subscribers.push(subscriber)

        // Update the state with the new subscribers
        setMeetingInfo((prevState) => ({
          ...prevState,
          subscribers: subscribers,
        }))
      })

      // On every Stream destroyed...
      mySession.on('streamDestroyed', (event) => {
        CONSOLE.event('누군가 나갔습니다!')
        // Remove the stream from 'subscribers' array
        deleteSubscriber(
          event.stream.streamManager,
          meetingInfo.subscribers,
          setMeetingInfo,
        )
      })

      // On every asynchronous exception...
      mySession.on('exception', (exception) => {
        CONSOLE.event('비동기적 에러가 발생했습니다!')
        console.warn(exception)
      })

      getToken(meetingInfo.mySessionId).then((token) => {
        const mySession = meetingInfo.session
        mySession
          .connect(token, { clientData: loggedInUserNickname })
          .then(async () => {
            const publisher = await OV.initPublisherAsync(
              undefined,
              videoOption,
            )

            setMeetingInfo((prevState) => ({
              ...prevState,
              mainStreamManager: publisher,
              publisher: publisher,
              prevPublisher: undefined,
            }))
          })
      })
    }
  }, [meetingInfo])

  return (
    <MainLayout>
      <WaitContainer>
        <ScreenContainer
          nickname={loggedInUserNickname} // 로그인 사용자의 닉네임 가져오기
          streamManager={meetingInfo.publisher}
          isTokenRequested={isTokenRequested}
          toggleMic={toggleMic}
          toggleCam={toggleCam}
        ></ScreenContainer>
        <ContextContainer joinMeetingRoom={joinMeetingRoom}></ContextContainer>
      </WaitContainer>
    </MainLayout>
  )
}

const WaitContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 720px;
`

async function getToken(newSessionId) {
  const sessionId = await createSession(newSessionId).catch((error) => {
    processError(error, '세션 생성 중 오류 발생!')
  })
  return await createToken(sessionId).catch((error) => {
    processError(error, '커넥션 생성 중 오류 발생!')
  })
}

function processError(error, message) {
  CONSOLE.error('==== ERROR OCCURED!! ====')
  CONSOLE.error(message)
  console.log(error)
}

function deleteSubscriber(streamManager, subscribers, setMeetingInfo) {
  let index = subscribers.indexOf(streamManager, 0)
  if (index > -1) {
    subscribers.splice(index, 1)
    setMeetingInfo((prevState) => ({
      ...prevState,
      subscribers: subscribers,
    }))
  }
}

export default MeetWaiting
