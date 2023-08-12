import React from 'react'
import styled from 'styled-components'
import GroupItem from '../common/GroupItem'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`

function GroupList({ groupList }) {
  return (
    <Container>
      {groupList.map((group, index) => (
        <GroupItem group={group} key={index} />
      ))}
    </Container>
  )
}

export default GroupList
