import React from 'react'
import styled from 'styled-components'
import GroupHomeProfile from '../components/GroupHomePage/GroupHomeProfile'
import GroupHomeDetail from '../components/GroupHomePage/GroupHomeDetail'
import MainLayout from '../components/Layout/MainLayout'
import { groupApi } from '../components/GroupDetailPage/api/groupApi'
import ServerError from '../components/common/ServerError'

const menuForMember = ['상세 정보', '인원 정보', '책방 정보']

const GroupHomePage = () => {
  // rtk query로 필요한 데이터 불러오기
  const groupQuery = groupApi.useGetGroupQuery()
  const usersQuery = groupApi.useGetUsersQuery()

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
      <div className="container">
        <GroupHomeProfile
          group={groupMarvel}
          count={groupMemberCount}
          isLeader={isLeader()}
        />
        <GroupHomeDetail
          group={groupMarvel}
          users={sampleGroupMembers}
          menu={menuForMember}
        />
      </div>
    </MainLayout>
  )
}

function isLeader() {
  // TODO: redux에서 로그인 아이디 가져와서 리더인지 판별 로직 구현하기
  return true
}

export default GroupHomePage
