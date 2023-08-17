import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import JoinedMemberItem from './JoinedMemberItem'
import Swal from 'sweetalert2'
import deleteJoinedMember from '../../api/joinedMemberApi'
import { jwtBackApiInstance } from '../../api/http'
import LoadingItem from '../common/LoadingItem'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const MemberList = styled.div`
  width: 850px;
`

function JoinedMember() {
  const currentUrlSplited = window.location.href.split('/')
  const groupId = currentUrlSplited[currentUrlSplited.length - 2]

  const [users, setUsers] = useState(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(null)

        const jwtHttp = jwtBackApiInstance()
        const URL = `/api/groups/${groupId}/members`
        const response = await jwtHttp.get(URL)

        const leaderId = response.data.data.leaderId
        setUsers(response.data.data.users.filter((user) => user.id != leaderId))
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login')
        } else {
          navigate('/error')
        }
      }
    }
    fetchUsers()
  }, [])

  const onRemove = (id) => {
    Swal.fire({
      title: '정말 내보내시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '내보내기',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteJoinedMember(groupId, id)
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
          <JoinedMemberItem
            user={user}
            key={index}
            underLine={index !== users.length - 1}
            onRemove={onRemove}
          ></JoinedMemberItem>
        ))}
      </MemberList>
    </Container>
  )
}

export default JoinedMember
