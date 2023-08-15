import React from 'react'
import { styled } from 'styled-components'
import SoundBtn from '../meeting/buttonMeeting/SoundBtn'
import CameraBtn from '../meeting/buttonMeeting/CameraBtn'
import ShareBtn from '../meeting/buttonMeeting/ShareBtn'
import EmojiBtnInWaitingRoom from '../meeting/buttonMeeting/EmojiBtnInWaitingRoom'
import BackGroundBtn from '../meeting/buttonMeeting/BackGroundBtn'
import SettingBtn from '../meeting/buttonMeeting/SettingBtn'

const VideoButtonsInWaitingRoom = ({ toggleCam, toggleMic }) => {
  return (
    <Buttons>
      {/* 카메라 버튼 */}
      <CameraBtn toggleCam={toggleCam}></CameraBtn>
      {/* 소리 버튼 */}
      <SoundBtn toggleMic={toggleMic}></SoundBtn>
      {/* 화면공유 버튼 */}
      <ShareBtn></ShareBtn>
      {/* 이모지 버튼 */}
      <EmojiBtnInWaitingRoom></EmojiBtnInWaitingRoom>
      {/* 배경전환 버튼 */}
      <BackGroundBtn></BackGroundBtn>
      {/* 설정 버튼 */}
      <SettingBtn></SettingBtn>
    </Buttons>
  )
}

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 20px;
`

export default VideoButtonsInWaitingRoom
