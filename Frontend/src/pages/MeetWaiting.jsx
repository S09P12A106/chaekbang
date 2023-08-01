import React from 'react'
import { styled } from 'styled-components'
import ScreenContainer from '../components/meeting/waiting/ScreenContainer'
import ContextContainer from '../components/meeting/waiting/ContextContainer'
import MainLayout from '../components/Layout/MainLayout'
function MeetWaiting() {
  return (
    <MainLayout>
      <WaitContainer>
        <ScreenContainer></ScreenContainer>
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

export default MeetWaiting
