import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import GroupDetailInfo from './GroupDetailInfo'
import GroupMembersInfo from './GroupMembersInfo'
import { findLeader } from './util'

const GroupDetail = ({ group, membersInfo, menu }) => {
  const [activeTab, setActiveTab] = useState(0)

  const leader = findLeader(membersInfo.users, membersInfo.leaderId)

  const tabComponents = {
    0: <GroupDetailInfo detail={group.detail} />,
    1: <GroupMembersInfo users={membersInfo.users} leader={leader} />,
  }

  const TabInfo = tabComponents[activeTab]

  return (
    <div>
      <MenuTab menus={menu} activeTab={activeTab} setActiveTab={setActiveTab} />
      {TabInfo}
    </div>
  )
}

export default React.memo(GroupDetail)
