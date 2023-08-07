import React, { useEffect, useState, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import ScreenContainer from '../components/meeting/waiting/ScreenContainer'
import ContextContainer from '../components/meeting/waiting/ContextContainer'
import MainLayout from '../components/Layout/MainLayout'
import { OpenVidu } from 'openvidu-browser'
import CONSOLE from '../utils/consoleColors'
import axios from 'axios'

// const OV = new OpenVidu()
const APPLICATION_SERVER_URL = 'http://localhost:5000/'

let mySession

function MeetWaiting() {
  const navigate = useNavigate()
  const isTokenRequested = useRef(false)
  const ovObj = useMemo(() => {
    const ov = new OpenVidu()
    return { OV: ov }
  }, [])
  const OV = ovObj.OV

  CONSOLE.reRender('리렌더링')

  const [meetingState, setMeetingState] = useState(() => {
    CONSOLE.info('초기값 설정')
    return {
      mySessionId: 'SessionA',
      myUserName: 'James',
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      isSet: false,
    }
  })

  /**
   * 미디어 소스를 담고 있는 객체를 Promise로 반환합니다.
   *
   * audioSource : 마이크 소스, undefined일 시 기본 마이크로 설정
   *
   * videoSource : 오디오 소스, undefined일 시 기본 비디오 소스로 설정
   *
   * publishAudio : true이면 마이크 활성화, false이면 mute
   *
   * publishVideo : video on/off
   *
   * resolution : 캠 해상도
   *
   * frameRate : 비디오 frame rate
   *
   * insertMode : How the video is inserted in the target element 'video-container'
   *
   * mirror : Whether to mirror your local video or not
   */
  const [videoOption, setVideoOption] = useState({
    audioSource: undefined,
    videoSource: undefined,
    publishAudio: true,
    publishVideo: true,
    resolution: '640x480',
    frameRate: 30,
    insertMode: 'APPEND',
    mirror: false,
  })

  function toggleMic() {
    setVideoOption((prevOption) => ({
      ...prevOption,
      publishAudio: !prevOption.publishAudio,
    }))
  }

  function toggleCam() {
    setVideoOption((prevOption) => ({
      ...prevOption,
      publishVideo: !prevOption.publishVideo,
    }))
  }

  useEffect(() => {
    if (isTokenRequested.current) {
      const newPublisher = OV.initPublisher(undefined, videoOption)
      setMeetingState((prevState) => ({
        ...prevState,
        mainStreamManager: newPublisher,
        publisher: newPublisher,
      }))
    }
  }, [videoOption])

  const handleRefresh = (e) => {
    CONSOLE.info('beforeunload event occured!!')
    e.preventDefault()
    e.returnValue = '' // 이 줄은 일부 브라우저에서 경고 메시지를 표시하지 않도록 합니다.
    if (meetingState.publisher) {
      meetingState.publisher.off()
    }
    if (mySession) {
      CONSOLE.event('event - disconnected!!')
      mySession.disconnect()
    }
  }

  // meetingState의 첫번째 변경
  useEffect(() => {
    CONSOLE.info('세션을 시작합니다.')
    setMeetingState((prevState) => ({
      ...prevState,
      session: OV.initSession(),
    }))
    return () => {
      CONSOLE.info('clean up!!')
      alert('dsafkjle')
      console.log(meetingState)
      if (meetingState.session) {
        CONSOLE.event('disconnected!!')
        mySession.disconnect()
      }
    }
  }, [])

  /**
   * 아래의 useEffect는 meetingState의 변화를 감지할 때 실행됩니다.
   * 그런데 아래의 useEffect는 로직 내부에 setMeetingState을 사용해서 자칫 무한루프에 빠질 가능성이 있는 문제가 있습니다.
   * 따라서 아래의 로직이 실행될 때 isTokenRequested을 true로 바꿔서 처음 meetingState가 변경될 때만 수행하게 하고 두번째 변경부터는 아래의 useEffect 로직 수행을 막습니다.
   */
  useEffect(() => {
    if (meetingState.session && !isTokenRequested.current) {
      CONSOLE.info('서버에 토큰을 요청합니다.')
      isTokenRequested.current = true
      mySession = meetingState.session
      // On every Stream created...
      mySession.on('streamCreated', (event) => {
        CONSOLE.event('누군가 참여했습니다!')
        // Subscribe to the Stream to receive it. Second parameter is undefined
        // so OpenVidu doesn't create an HTML video by its own
        const subscriber = mySession.subscribe(event.stream, undefined)
        const subscribers = meetingState.subscribers
        subscribers.push(subscriber)

        // Update the state with the new subscribers
        setMeetingState((prevState) => ({
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
          meetingState.subscribers,
          setMeetingState,
        )
      })

      // On every asynchronous exception...
      mySession.on('exception', (exception) => {
        CONSOLE.event('비동기적 에러가 발생했습니다!')
        console.warn(exception)
      })

      getToken(meetingState.mySessionId)
        .then((token) => {
          const mySession = meetingState.session
          mySession.connect(token, { clientData: 'James' }).then(async () => {
            const publisher = await OV.initPublisherAsync(
              undefined,
              videoOption,
            )

            setMeetingState((prevState) => ({
              ...prevState,
              mainStreamManager: publisher,
              publisher: publisher,
            }))
          })
        })
        .catch((error) => {
          CONSOLE.error('==== ERROR OCCURED!! ====')
          CONSOLE.error(error)
        })
    }
  }, [meetingState])

  return (
    <MainLayout>
      <WaitContainer>
        <ScreenContainer
          nickname="James" // 로그인 사용자의 닉네임 가져오기
          streamManager={meetingState.publisher}
          isTokenRequested={isTokenRequested}
          toggleMic={toggleMic}
          toggleCam={toggleCam}
        ></ScreenContainer>
        <ContextContainer></ContextContainer>
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
  const sessionId = await createSession(newSessionId)
  return await createToken(sessionId)
}

async function createSession(sessionId) {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions',
    { customSessionId: sessionId },
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data // The sessionId
}

async function createToken(sessionId) {
  const response = await axios.post(
    APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections',
    {},
    {
      headers: { 'Content-Type': 'application/json' },
    },
  )
  return response.data // The token
}

function deleteSubscriber(streamManager, subscribers, setMeetingState) {
  let index = subscribers.indexOf(streamManager, 0)
  if (index > -1) {
    subscribers.splice(index, 1)
    setMeetingState((prevState) => ({
      ...prevState,
      subscribers: subscribers,
    }))
  }
}

export default MeetWaiting
