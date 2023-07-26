import React from 'react'
import styled from 'styled-components'
import { getListGroup } from '../main/GroupDummydata'
import GroupItem from '../common/GroupItem'

const Container = styled.div`
  padding: 10px;
`
const ListBlock = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(20%, 1fr));
  grid-gap: 10px;
  column-gap: 10px;
  align-items: flex-start;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  }
`
function SearchGroupList() {
  const dummpys = getListGroup(10)
  return (
    <Container>
      <ListBlock>
        {dummpys.map((group, index) => (
          <GroupItem group={group} key={index}></GroupItem>
        ))}
      </ListBlock>
    </Container>
  )
}

export default SearchGroupList
