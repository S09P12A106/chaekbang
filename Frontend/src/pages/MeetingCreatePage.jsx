import React, { useState } from 'react'
import MainLayout from '../components/Layout/MainLayout'
import { styled } from 'styled-components'
import MeetingCreateContainer from '../components/MeetingCreatePage/MeetingCreateContainer'

const Container = styled.div``

function MeetingCreatePage() {
  return (
    <MainLayout>
      <Container>
        <MeetingCreateContainer />
      </Container>
    </MainLayout>
  )
}

export default MeetingCreatePage
