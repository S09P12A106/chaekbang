import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import GroupProfile from '../components/GroupDetailPage/GroupProfile'
import GroupDetail from '../components/GroupDetailPage/GroupDetail'
import Modal from '../components/common/ModalWindow'
import GroupApplyForm from '../components/GroupDetailPage/GroupApplyForm'
import MainLayout from '../components/Layout/MainLayout'
import { groupApi } from '../components/GroupDetailPage/api/groupApi'
import ServerError from '../components/common/ServerError'

const menuForUser = ['상세 정보', '인원 정보']

function GroupDetailPage() {
  // rtk query로 필요한 데이터 불러오기
  const groupQuery = groupApi.useGetGroupQuery()
  const usersQuery = groupApi.useGetUsersQuery()

  const [isOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden' // 스크롤 방지
  }, [])

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = 'auto' // 스크롤 활성화
  }

  // 조건문이 나왔기 때문에 이 아래에 hook을 쓰면 안된다.
  if (groupQuery.isLoading || usersQuery.isLoading) {
    return (
      <div>
        <h1>로딩중입니다!!!</h1>
      </div>
    )
  }

  // TODO: 데이터 받아오는 것 관련 에러 페이지 작성
  if (groupQuery.isError || usersQuery.isError) {
    return <ServerError />
  }

  const groupMarvel = groupQuery.data
  const sampleGroupMembers = usersQuery.data
  const groupMemberCount = sampleGroupMembers.length

  return (
    <MainLayout>
      <GroupProfile
        group={groupMarvel}
        count={groupMemberCount}
        setModalOpen={openModal}
      />
      <GroupDetail
        group={groupMarvel}
        users={sampleGroupMembers}
        menu={menuForUser}
      />
      <Modal isOpen={isOpen} width={'30rem'}>
        <GroupApplyForm
          question={groupMarvel.question}
          setModalOpen={closeModal}
        />
      </Modal>
    </MainLayout>
  )
}

export default GroupDetailPage
