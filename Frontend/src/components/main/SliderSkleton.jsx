import styled from 'styled-components'
import React from 'react'
import GroupItemSkleton from '../common/GroupItemSkleton'

const Container = styled.div`
  height: 300px;
  display: flex;
`
function SliderSkleton() {
  return (
    <Container>
      <GroupItemSkleton />
      <GroupItemSkleton />
    </Container>
  )
}

export default SliderSkleton
