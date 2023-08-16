import React from 'react'
import { styled } from 'styled-components'
import UserVideoComponent from '../../WaitingRoom/UserVideoComponent'
import VideoButtonsInWaitingRoom from '../../common/VideoButtonsInWaitingRoom'

function ScreenContainer({
  nickname,
  streamManager,
  isTokenRequested,
  toggleMic,
  toggleCam,
}) {
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
