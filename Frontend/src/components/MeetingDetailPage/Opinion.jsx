import React from 'react'
import { styled } from 'styled-components'
import UserItem from './UserItem'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`
const UserItemContainer = styled.div``
const OpinionContainer = styled.div`
  padding-bottom: 1rem;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow:
    -1px -1px 2px rgba(228, 226, 226, 0.8),
    1px 2px 2px rgba(0, 0, 0, 0.2);
`
const OpinionContainerContainer = styled.div`
  display: flex;
  align-items: center;
`

function Opinion({ oneOpinion, left }) {
  // userId
  // profileImageUrl
  // nickname
  // opinion
  if (left) {
    return (
      <Container>
        <UserItemContainer>
          <UserItem
            user={{
              profileImageUrl: oneOpinion.profileImageUrl,
              nickname: oneOpinion.nickname,
            }}
          ></UserItem>
        </UserItemContainer>
        <OpinionContainerContainer style={{ marginLeft: '2rem' }}>
          <OpinionContainer>{oneOpinion.opinion}</OpinionContainer>
        </OpinionContainerContainer>
      </Container>
    )
  } else {
    return (
      <Container>
        <OpinionContainerContainer style={{ marginRight: '2rem' }}>
          <OpinionContainer>{oneOpinion.opinion}</OpinionContainer>
        </OpinionContainerContainer>
        <UserItemContainer>
          <UserItem
            user={{
              profileImageUrl: oneOpinion.profileImageUrl,
              nickname: oneOpinion.nickname,
            }}
          ></UserItem>
        </UserItemContainer>
      </Container>
    )
  }
}

export default Opinion
