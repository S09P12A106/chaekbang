import React from 'react'
import { styled, css } from 'styled-components'
import SoundBtn from '../buttonMeeting/SoundBtn'
import CameraBtn from '../buttonMeeting/CameraBtn'
import ShareBtn from '../buttonMeeting/ShareBtn'
import EmojiBtn from '../buttonMeeting/EmojiBtn'
import BackGroundBtn from '../buttonMeeting/BackGroundBtn'
import SettingBtn from '../buttonMeeting/SettingBtn'
import UserVideoComponent from '../../WaitingRoom/UserVideoComponent'
import VideoButtonsInWaitingRoom from '../../common/VideoButtonsInWaitingRoom'

function ScreenContainer({
  nickname,
  streamManager,
  isTokenRequested,
  toggleMic,
  toggleCam,
}) {
  console.log(isTokenRequested)
  return (
    <Container>
      {isTokenRequested.current ? (
        <div>
          <Screen>
            <UserVideoComponent
              nickname={nickname}
              streamManager={streamManager}
            />
          </Screen>

          <VideoButtonsInWaitingRoom
            toggleCam={toggleCam}
            toggleMic={toggleMic}
          />
        </div>
      ) : (
        <div>로딩 중입니다.</div>
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  margin: 20px;
`

const Screen = styled.div`
  width: 100%;
  background-color: grey;
`

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
`

export default ScreenContainer
