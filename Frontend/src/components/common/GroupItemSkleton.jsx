import React from 'react'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import SkletonItem from './SkletonItme'

const Container = styled.div`
  width: 220px;
  margin-right: 20px;
  .green {
    color: ${COLORS.THEME_COLOR2};
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Image = styled(SkletonItem)`
  width: 220px;
  height: 220px;
  /* cursor: pointer; */
  border-radius: 20px;
`

const Title = styled(SkletonItem)`
  width: 50%;
  margin: 5px 0px 0px 5px;
`

const ShowUserCountBlock = styled(SkletonItem)`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px 0px 5px;
  font-size: 0.7rem;
  color: ${COLORS.GREY};
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 5px 0px 0px 5px;
  align-items: center;
  div {
    margin-top: 5px;
    margin-right: 5px;
  }
`
const ShowUser = styled(SkletonItem)`
  display: inline-block;
`
const ViewCount = styled(SkletonItem)`
  display: inline-flex;
  align-items: center;
`
const Tag = styled(SkletonItem)`
  width: 50px;
  height: 25px;
`

function GroupItemSkleton() {
  return (
    <Container>
      <Image />
      <Title />
      <ShowUserCountBlock>
        <ShowUser></ShowUser>
        <ViewCount></ViewCount>
      </ShowUserCountBlock>
      <TagList>
        <Tag />
        <Tag />
        <Tag />
      </TagList>
    </Container>
  )
}

export default GroupItemSkleton
