import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import GroupDetailInfo from '../GroupDetailPage/GroupDetailInfo'
import GroupMembersInfo from '../GroupDetailPage/GroupMembersInfo'
import MeetingsInfo from './MeetingsInfo'

const GroupHomeDetail = ({ group, users, menu }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabComponents = {
    0: <GroupDetailInfo detail={group.detail} />,
    1: <GroupMembersInfo users={users} leader={group.leader} />,
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
