import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { styled } from 'styled-components'
import { OpenVidu } from 'openvidu-browser'
import MeetWaiting from './MeetWaiting'
import MeetingRoomPage from './MeetingRoomPage'
import CONSOLE from '../utils/consoleColors'
import { getSessionId } from '../api/groupHomeApi'
import { useNavigate, useLocation } from 'react-router-dom'

/*
openvidu의 Publisher Type 객체
- 내 비디오 정보를 가지고 있는 객체
- props로 받을 때 객체 이름을 보통 streamManager로 받습니다
- OvVideo.jsx 컴포넌트가 video 태그에 영상을 넣어주는 컴포넌트인데 
streamManager.addVideoElement(videoRef.current)
와 같은 방식으로 비디오 태그에 영상을 넣을 수 있습니다.
- session.publish 로 나의 영상을 송출할 수 있습니다.
- 영상 관련 옵션을 변경할 때는 새로운 옵션으로 Publisher를 다시 init해야 합니다. session의 initPublisherAsync 또는 initPublisher로 할 수 있습니다.
*/
const OV = new OpenVidu()

const MeetingPage = () => {
  CONSOLE.reRender('MeetingPage rendered')

  // url에서 meetingId 받기
  const [sessionId, setSessionId] = useState(null)

  useEffect(() => {
    setMeetingInfo((prevInfo) => ({
      ...prevInfo,
      mySessionId: sessionId,
    }))
  }, [sessionId])

  const location = useLocation()
  const navigate = useNavigate()
  //세션 id 받기
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const meetingId = queryParams.get('meetingId')

    const setSession = async () => {
      try {
        const response = await getSessionId(meetingId)
        setSessionId(response.data.data)
      } catch (error) {
        navigate('/error')
      }
    }
    setSession()
  }, [])

  const loggedInUser = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  /*
  - mySessionId : 세션(책방 당 하나)의 아이디
  - myUserName : 내 영상에 표시될 닉네임
  - session : 세션 객체 => 세션과의 상호작용을 담당, 세션 정보 또한 가지고 있습니다.
  - mainStreamManager: 메인 영상으로 표시될 Publisher
  - publisher : 나의 Publisher 객체
  - prevPublisher : video option 변경시 unpublish를 위해 갖고 있는 이전 publisher
  - subscribers : 나를 제외한 책방에 참여하고 있는 접속자들의 Publisher 객체
  */
  const meetingInfoState = useState(() => {
    return {
      mySessionId: null,
      myUserName: loggedInUser.userId,
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      prevPublisher: undefined,
      subscribers: [],
    }
  })

  const [meetingInfo, setMeetingInfo] = meetingInfoState

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

  useEffect(() => {
    const newPublisher = OV.initPublisher(undefined, videoOption)
    setMeetingInfo((prevState) => ({
      ...prevState,
      mainStreamManager: newPublisher,
      publisher: newPublisher,
    }))
  }, [videoOption])

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

  const [isWaitingState, setIsWaitingState] = useState(true)

  function joinMeetingRoom() {
    alert('책방에 참여합니다!')
    setIsWaitingState(false)
  }

  return (
    <div>
      {meetingInfo.mySessionId !== null && (
        <>
          {isWaitingState ? (
            <MeetWaiting
              meetingInfoState={meetingInfoState}
              videoOption={videoOption}
              toggleMic={toggleMic}
              toggleCam={toggleCam}
              joinMeetingRoom={joinMeetingRoom}
            />
          ) : (
            <MeetingRoomPage
              meetingInfoState={meetingInfoState}
              videoOption={videoOption}
              toggleMic={toggleMic}
              toggleCam={toggleCam}
            />
          )}
          {/* <h1>책방 입니다.</h1> */}
        </>
      )}
    </div>
  )
}

export default MeetingPage
