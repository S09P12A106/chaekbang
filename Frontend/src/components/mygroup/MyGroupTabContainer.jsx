import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import SearchGroupList from '../search/SearchGroupList'

const Container = styled.div``

const myGroupMenu = ['내 모임', '신청한 모임', '이전 모임']

function MyGroupTabContainer() {
  const [activeTab, setActiveTab] = useState(0)

  const myGroupTabComponents = {
    0: <SearchGroupList />,
    1: <SearchGroupList />,
    2: <SearchGroupList />,
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

export default MyGroupTabContainer
