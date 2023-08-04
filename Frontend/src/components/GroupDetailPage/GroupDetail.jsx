import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import GroupDetailInfo from './GroupDetailInfo'
import GroupMembersInfo from './GroupMembersInfo'

const GroupDetail = ({ group, users, menu }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabComponents = {
    0: <GroupDetailInfo detail={group.detail} />,
    1: <GroupMembersInfo users={users} leader={group.leader} />,
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
