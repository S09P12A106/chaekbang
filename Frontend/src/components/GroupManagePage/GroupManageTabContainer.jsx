import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import JoinedMember from './JoinedMember'
import AppliedMember from './AppliedMember'
import UpdateGroup from './UpdateGroup'

const Container = styled.div``

const myGroupMenu = ['가입 회원 관리', '신청 회원 관리', '모임 내용 수정']

function GroupManagementTabContainer() {
  const [activeTab, setActiveTab] = useState(0)

  const myGroupTabComponents = {
    0: <JoinedMember />,
    1: <AppliedMember />,
    2: <UpdateGroup />,
  }

  const selectGroupTab = myGroupTabComponents[activeTab]

  return (
    <Container>
      <MenuTab
        menus={myGroupMenu}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      {selectGroupTab}
    </Container>
  )
}

export default GroupManagementTabContainer
