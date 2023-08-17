import React from 'react'
import { styled } from 'styled-components'
import MainLayout from '../components/Layout/MainLayout'
import MyPageContainer from '../components/mypage/MyPageContainer'

const Container = styled.div``

function MyPage() {
  return (
    <MainLayout>
      <Container>
        <MyPageContainer></MyPageContainer>
      </Container>
    </MainLayout>
  )
}

export default MyPage
