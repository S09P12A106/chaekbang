import React, { useState } from 'react'
import styled from 'styled-components'
import COLORS from '../../constants/colors'

const MenuTab = ({ menus, activeTab, setActiveTab }) => {
  const handleTabClick = (index) => {
    setActiveTab(index)
  }

  return (
    <TabContainer>
      {menus.map((menu, index) => {
        const ok = activeTab === index ? 'ok' : 'no'
        return (
          <Tab key={index} focused={ok} onClick={() => handleTabClick(index)}>
            {menu}
          </Tab>
        )
      })}
    </TabContainer>
  )
}

const TabContainer = styled.div`
  margin: 2rem 0;
  border-bottom: 0.2rem solid ${COLORS.MENU_TAB_UNDERLINE};
`

const Tab = styled.span`
  display: inline-block;
  border-bottom: ${(props) => {
    return props.focused == 'ok' ? '0.3rem solid black' : 'none'
  }};
  margin-left: 2rem;
  padding-bottom: 0.3rem;
  cursor: pointer;
  font-size: 1.3rem;
`
export default MenuTab
