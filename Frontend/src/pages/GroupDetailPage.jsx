import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import GroupProfile from '../components/GroupDetailPage/GroupProfile'
import GroupDetail from '../components/GroupDetailPage/GroupDetail'
import Modal from '../components/common/ModalWindow'
import GroupApplyForm from '../components/GroupDetailPage/GroupApplyForm'
import MainLayout from '../components/Layout/MainLayout'
import ServerError from '../components/common/ServerError'
import { getGroupDetail, getGroupMembers } from '../api/groupDetailApi'

const menuForUser = ['상세 정보', '인원 정보']

function GroupDetailPage() {
  const { groupId } = useParams()

  const [isOpen, setModalOpen] = useState(false)
  const [groupInfo, setGroupInfo] = useState(null)
  const [groupMembers, setGroupMembers] = useState(null)

  useEffect(() => {
    // api: group 정보 가져오기
    getGroupDetail(
      groupId,
      ({ data }) => {
        // console.log(data.data)
        setGroupInfo(data.data)
      },
      (error) => {
        console.log(error)
        return <ServerError />
      },
    )

    // api: group member 정보 가져오기
    getGroupMembers(
      groupId,
      ({ data }) => {
        // console.log(data.data)
        setGroupMembers(data.data)
      },
      (error) => {
        console.log(error)
        return <ServerError />
      },
    )
  }, [])

  const openModal = useCallback(() => {
    setModalOpen(true)
    document.body.style.overflow = 'hidden' // 스크롤 방지
  }, [])

  const closeModal = () => {
    setModalOpen(false)
    document.body.style.overflow = 'auto' // 스크롤 활성화
  }

  if (!groupInfo || !groupMembers) {
    return (
      <div>
        <h1>로딩중입니다!!!</h1>
      </div>
    )
  }

  return (
    <MainLayout>
      <GroupProfile
        group={groupInfo}
        membersInfo={groupMembers}
        setModalOpen={openModal}
      />
      <GroupDetail
        group={groupInfo}
        membersInfo={groupMembers}
        menu={menuForUser}
      />
      <Modal isOpen={isOpen} width={'30rem'}>
        <GroupApplyForm
          question={groupInfo.question}
          setModalOpen={closeModal}
        />
      </Modal>
    </MainLayout>
  )
}

export default GroupDetailPage
