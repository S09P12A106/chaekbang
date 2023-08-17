import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import GroupDetailInfo from '../GroupDetailPage/GroupDetailInfo'
import GroupMembersInfo from '../GroupDetailPage/GroupMembersInfo'
import MeetingsInfo from './MeetingsInfo'
import { findLeader } from '../GroupDetailPage/util'

const GroupHomeDetail = ({ group, membersInfo, menu }) => {
  const [activeTab, setActiveTab] = useState(0)

  const leader = findLeader(membersInfo.users, membersInfo.leaderId)

  const tabComponents = {
    0: <GroupDetailInfo detail={group.detail} />,
    1: <GroupMembersInfo users={membersInfo.users} leader={leader} />,
    2: <MeetingsInfo />,
  }

  const TabInfo = tabComponents[activeTab]

  return (
    <div>
      <MenuTab menus={menu} activeTab={activeTab} setActiveTab={setActiveTab} />
      {TabInfo}
    </div>
  )
}

export default React.memo(GroupHomeDetail)
