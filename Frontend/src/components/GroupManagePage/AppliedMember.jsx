import React, { useState } from 'react'
import { getListAppliedMember } from './AppliedMemberDummy'
import AppliedMemberItem from './AppliedMemberItem'
import { styled } from 'styled-components'
import Swal from 'sweetalert2'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const MemberList = styled.div`
  width: 850px;
`

function AppliedMember() {
  const dummys = getListAppliedMember()
  const [users, setUsers] = useState(dummys)

  const onApprove = (id) => {
    Swal.fire({
      title: '정말 승인하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers(users.filter((user) => user.userId !== id))
      }
    })
  }
  const onDeny = (id) => {
    Swal.fire({
      title: '정말 거절하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '거절',
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
          <AppliedMemberItem
            user={user}
            key={user.userId}
            underLine={index !== dummys.length - 1}
            onApprove={onApprove}
            onDeny={onDeny}
            question={'왜 참여하고 싶니이이잉?'}
          ></AppliedMemberItem>
        ))}
      </MemberList>
    </Container>
  )
}

export default AppliedMember
