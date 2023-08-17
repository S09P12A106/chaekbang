import React from 'react'
import styled from 'styled-components'
import GroupItem from '../common/GroupItem'
import GroupItemSkleton from '../common/GroupItemSkleton'

const Container = styled.div`
  padding: 10px;
`
const ListBlock = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(22%, 1fr));
  grid-gap: 20px;
  column-gap: 30px;
  align-items: flex-start;

  @media (max-width: 940px) {
    grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  }
`
function SearchGroupList({ groups }) {
  return (
    <Container>
      <ListBlock>
        {groups == null ? (
          <>
            <GroupItemSkleton />
            <GroupItemSkleton />
            <GroupItemSkleton />
            <GroupItemSkleton />
          </>
        ) : (
          groups.map((group, index) => (
            <GroupItem group={group} key={index}></GroupItem>
          ))
        )}
      </ListBlock>
    </Container>
  )
}

export default React.memo(SearchGroupList)
