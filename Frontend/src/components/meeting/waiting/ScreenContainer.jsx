import React from 'react'
import { styled, css } from 'styled-components'
import SoundBtn from '../buttonMeeting/SoundBtn'
import CameraBtn from '../buttonMeeting/CameraBtn'
import ShareBtn from '../buttonMeeting/ShareBtn'
import EmojiBtn from '../buttonMeeting/EmojiBtn'
import BackGroundBtn from '../buttonMeeting/BackGroundBtn'
import SettingBtn from '../buttonMeeting/SettingBtn'
import UserVideoComponent from '../../WaitingRoom/UserVideoComponent'

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

          <Buttons>
            {/* 카메라 버튼 */}
            <CameraBtn toggleCam={toggleCam}></CameraBtn>
            {/* 소리 버튼 */}
            <SoundBtn toggleMic={toggleMic}></SoundBtn>
            {/* 화면공유 버튼 */}
            <ShareBtn></ShareBtn>
            {/* 이모지 버튼 */}
            <EmojiBtn></EmojiBtn>
            {/* 배경전환 버튼 */}
            <BackGroundBtn></BackGroundBtn>
            {/* 설정 버튼 */}
            <SettingBtn></SettingBtn>
          </Buttons>
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
