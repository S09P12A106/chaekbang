import React, { useState } from 'react'
import { getListJoinedMember } from './JoinedMemberDummy'
import { styled } from 'styled-components'
import JoinedMemberItem from './JoinedMemberItem'
import Swal from 'sweetalert2'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const MemberList = styled.div`
  width: 850px;
`

function JoinedMember() {
  const dummys = getListJoinedMember()
  const [users, setUsers] = useState(dummys)

  const onRemove = (id) => {
    Swal.fire({
      title: '정말 내보내시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '내보내기',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.userId !== id))
      }
    })
  }

  return (
    <Container>
      <MemberList>
        {users.map((user, index) => (
          <JoinedMemberItem
            user={user}
            key={user.userId}
            underLine={index !== dummys.length - 1}
            onRemove={onRemove}
          ></JoinedMemberItem>
        ))}
      </MemberList>
    </Container>
  )
}

export default JoinedMember
