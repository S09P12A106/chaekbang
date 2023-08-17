import React from 'react'
import styled from 'styled-components'
import MyGroupTabContainer from '../components/mygroup/MyGroupTabContainer'
import MainLayout from '../components/Layout/MainLayout'

const Container = styled.div``

function MyGroupPage() {
  return (
    <MainLayout>
      <Container>
        <MyGroupTabContainer />
      </Container>
    </MainLayout>
  )
}

export default MyGroupPage
