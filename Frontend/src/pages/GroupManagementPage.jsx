import React from 'react'
import styled from 'styled-components'
import MainLayout from '../components/Layout/MainLayout'
import GroupManagementTabContainer from '../components/GroupManagePage/GroupManageTabContainer'

const Container = styled.div``

function GroupManagementPage() {
  return (
    <MainLayout>
      <Container>
        <GroupManagementTabContainer />
      </Container>
    </MainLayout>
  )
}

export default GroupManagementPage
