import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import GroupProfile from '../components/GroupDetailPage/GroupProfile'
import GroupDetail from '../components/GroupDetailPage/GroupDetail'
import Modal from '../components/common/ModalWindow'
import GroupApplyForm from '../components/GroupDetailPage/GroupApplyForm'
import {
  sampleGroupMembers,
  groupMarvel,
  groupMemberCount,
} from '../components/GroupDetailPage/sampleData'

function GroupDetailPage() {
  const [isOpen, setModalOpen] = useState(false)

  const openModal = useCallback(() => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden' // 스크롤 방지
  }, [])

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = 'auto' // 스크롤 활성화
  }

  return (
    <div>
      <GroupProfile
        group={groupMarvel}
        count={groupMemberCount}
        setModalOpen={openModal}
      />
      <GroupDetail group={groupMarvel} users={sampleGroupMembers} />
      <Modal isOpen={isOpen} width={'30rem'}>
        <GroupApplyForm
          question={groupMarvel.question}
          setModalOpen={closeModal}
        />
      </Modal>
    </div>
  )
}

export default GroupDetailPage
