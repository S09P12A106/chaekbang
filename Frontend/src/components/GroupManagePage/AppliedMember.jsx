import React, { useEffect, useState } from 'react'
import AppliedMemberItem from './AppliedMemberItem'
import { styled } from 'styled-components'
import Swal from 'sweetalert2'
import approveAppliedMember from '../../api/approveAppliedMemberApi'
import denyAppliedMember from '../../api/denyAppliedMemberApi'
import { jwtBackApiInstance } from '../../api/http'
import { useNavigate } from 'react-router-dom'
import LoadingItem from '../common/LoadingItem'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const MemberList = styled.div`
  width: 850px;
`

function AppliedMember() {
  const currentUrlSplited = window.location.href.split('/')
  const groupId = currentUrlSplited[currentUrlSplited.length - 2]

  const [users, setUsers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    async function getAppliedMember() {
      try {
        setUsers(null)
        const jwtHttp = jwtBackApiInstance()

        const URL = `/api/groups/${groupId}/leaders/applications`
        const response = await jwtHttp.get(URL)

        setUsers(response.data.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login')
        } else {
          navigate('/error')
        }
      }
    }
    getAppliedMember()
  }, [])

  const onApprove = (id) => {
    Swal.fire({
      title: '정말 승인하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await approveAppliedMember(groupId, id)
          setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate('/login')
          } else {
            navigate('/error')
          }
        }
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await denyAppliedMember(groupId, id)
          setUsers(users.filter((user) => user.id !== id))
        } catch (error) {
          if (error.response && error.response.status === 401) {
            navigate('/login')
          } else {
            navigate('/error')
          }
        }
      }
    })
  }

  if (users === null) {
    return <LoadingItem></LoadingItem>
  }

  return (
    <Container>
      <MemberList>
        {users.map((user, index) => (
          <AppliedMemberItem
            user={user}
            key={index}
            underLine={index !== users.length - 1}
            onApprove={onApprove}
            onDeny={onDeny}
            question={'가입 동기'}
          ></AppliedMemberItem>
        ))}
      </MemberList>
    </Container>
  )
}

export default AppliedMember
