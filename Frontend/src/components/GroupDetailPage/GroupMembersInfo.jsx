import React from 'react'
import styled from 'styled-components'
import MemberInfo from './MemberInfo'

const GroupMembersInfo = ({ users, leader }) => {
  const userOfLeader = users.filter(
    (user) => user.nickname === leader.nickname,
  )[0]

  const usersExceptLeader = users.filter(
    (user) => user.nickname !== leader.nickname,
  )

  return (
    <GroupMembersInfoContainer>
      <h1>책방 주인</h1>
      <MemberInfo member={userOfLeader} />
      <hr />
      <h1>책방 손님</h1>
      <MembersContainer>
        {usersExceptLeader.map((user, index) => {
          return <MemberInfo member={user} />
        })}
      </MembersContainer>
    </GroupMembersInfoContainer>
  )
}

const GroupMembersInfoContainer = styled.div`
  padding: 0 4rem;
`

const MembersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
`

export default GroupMembersInfo
