import React from 'react'
import { styled } from 'styled-components'

const UserItemContainer = styled.div`
  display: flex;
  // margin-left: 2rem;
  // margin-right: 2rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  white-space: nowrap;
`
const Image = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 2rem;
`
const Nickname = styled.div`
  margin-left: 1rem;
  line-height: 4rem;
  font-size: 1.2rem;
`

function UserItem({ user }) {
  return (
    <UserItemContainer>
      <Image src={user.profileImageUrl}></Image>
      <Nickname>{user.nickname}</Nickname>
    </UserItemContainer>
  )
}

export default UserItem
