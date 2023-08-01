import React, { useState } from 'react'
import { styled } from 'styled-components'
import UserInfo from './UserInfo'
import GroupList from './GroupList'
import { getUser } from './UserDummy'

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 60px;
`

const InnerContainer = styled.div`
  width: 600px;
`

const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
`

const InfoInnerContainer = styled.div`
  padding-top: 40px;
  width: 500px;
`

const Title = styled.div`
  font-size: 30px;
  font-weight: 500;
`

function MyPageContainer() {
  const dummy = getUser()

  const [nickname, setNickname] = useState(dummy.nickname)

  return (
    <Container>
      <InnerContainer>
        <Title>마이페이지</Title>
        <InfoContainer>
          <InfoInnerContainer>
            <UserInfo
              user={dummy}
              setNickname={setNickname}
              nickname={nickname}
            ></UserInfo>
            <br></br>

            <GroupList title={'내 모임'} groups={dummy.myGroup}></GroupList>
            <GroupList
              title={'이전 모임 기록'}
              groups={dummy.groupHistory}
            ></GroupList>
          </InfoInnerContainer>
        </InfoContainer>
      </InnerContainer>
    </Container>
  )
}

export default MyPageContainer
