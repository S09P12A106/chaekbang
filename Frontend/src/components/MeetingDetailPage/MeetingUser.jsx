import React from 'react'
import { styled } from 'styled-components'
import UserItem from './UserItem'

const Container = styled.div``
const MeetingUserList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  margin-left: 1rem;
  font-weight: 600;
`
const Hr = styled.hr`
  color: #d8d8d8;
`
const MUContainer = styled.div`
  margin-left: 2rem;
`

function MeetingUser({ userData }) {
  return (
    <Container>
      <Title>참여자</Title>
      <Hr></Hr>
      <MeetingUserList>
        {userData.map((user, index) => (
          <MUContainer key={index}>
            <UserItem user={user}></UserItem>
          </MUContainer>
        ))}
      </MeetingUserList>
    </Container>
  )
}

export default MeetingUser
