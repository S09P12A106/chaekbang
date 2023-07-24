import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import GroupDetailInfo from './GroupDetailInfo'
import GroupMembersInfo from './GroupMembersInfo'
import { sampleMenus } from './sampleData'

const GroupDetail = ({ group, users }) => {
  const [activeTab, setActiveTab] = useState(0)

  const tabComponents = {
    0: <GroupDetailInfo detail={group.detail} />,
    1: <GroupMembersInfo users={users.users} leader={group.leader} />,
  }

  const TabInfo = tabComponents[activeTab]

  return (
    <div>
      <MenuTab
        menus={sampleMenus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {TabInfo}
    </div>
  )
}

export default React.memo(GroupDetail)
