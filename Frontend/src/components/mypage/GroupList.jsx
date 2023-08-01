import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div``

const Title = styled.div`
  font-size: 16px;
  color: #909090;
  margin-top: 10px;
  margin-bottom: 8px;
`

const GrayLine = styled.div`
  background-color: #d9d9d9;
  height: 1px;
`

const GroupContainer = styled.div`
  display: flex;
  justify-content: left;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Image = styled.img`
  width: 70px;
  height: 70px;
`

const GroupTitle = styled.div`
  line-height: 60px;
  font-size: 20px;
  margin-left: 20px;
`

function GroupItem({ group }) {
  return (
    <GroupContainer>
      <Image src={group.imageUrl}></Image>
      <GroupTitle>{group.title}</GroupTitle>
    </GroupContainer>
  )
}

function GroupList({ title, groups }) {
  return (
    <Container>
      <Title>{title}</Title>
      {groups.map((group, index) => (
        <GroupItem key={index} group={group}></GroupItem>
      ))}
      <GrayLine></GrayLine>
    </Container>
  )
}

export default GroupList
