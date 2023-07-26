import React from 'react'
import styled from 'styled-components'
import GroupProfile from '../components/GroupDetailPage/GroupProfile'
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
        <GroupProfile group={groupMarvel} count={groupMemberCount} />
        <GroupHomeDetail
          group={groupMarvel}
          users={sampleGroupMembers}
          menu={menuForMember}
        />
      </div>
    </MainLayout>
  )
}

export default GroupHomePage
