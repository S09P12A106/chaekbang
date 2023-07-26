import React from 'react'
import styled from 'styled-components'
import GroupHomeProfile from '../components/GroupHomePage/GroupHomeProfile'
import GroupHomeDetail from '../components/GroupHomePage/GroupHomeDetail'
import {
  sampleGroupMembers,
  groupMarvel,
  groupMemberCount,
  sampleMeetings,
} from '../components/GroupDetailPage/sampleData'
import MainLayout from '../components/Layout/MainLayout'

const menuForMember = ['상세 정보', '인원 정보', '책방 정보']

const GroupHomePage = () => {
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
