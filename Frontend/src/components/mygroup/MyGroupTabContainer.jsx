import React, { useState } from 'react'
import styled from 'styled-components'
import MenuTab from '../common/MenuTab'
import SearchGroupList from '../search/SearchGroupList'
import { useEffect } from 'react'
import {
  getMyApplicationGroupApi,
  getMyGroupsApi,
  getMyHistoryGroupsApi,
} from '../../api/myGroupApi'

const Container = styled.div``

const myGroupMenu = ['내 모임', '신청한 모임', '이전 모임']

function MyGroupTabContainer() {
  const [activeTab, setActiveTab] = useState(0)
  const [groupList, setGroupList] = useState(null)

  const myGroupTabComponents = {
    0: <SearchGroupList groups={groupList} />,
    1: <SearchGroupList groups={groupList} />,
    2: <SearchGroupList groups={groupList} />,
  }

  // tab이 바뀔때마다 데이터를 가져온다
  // 0 -> 내 그룹, 1 -> 신청 2 -> 히스토리
  const fetchMyGroup = async () => {
    const response = await getMyGroupsApi()
    setGroupList(response.data)
  }

  const fetchMyApplcation = async () => {
    const response = await getMyApplicationGroupApi()
    setGroupList(response.data)
  }

  const fetchMyHistory = async () => {
    const response = await getMyHistoryGroupsApi()
    setGroupList(response.data)
  }

  useEffect(() => {
    if (activeTab == 0) {
      fetchMyGroup()
    } else if (activeTab == 1) {
      fetchMyApplcation()
    } else {
      fetchMyHistory()
    }
  }, [activeTab])

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
