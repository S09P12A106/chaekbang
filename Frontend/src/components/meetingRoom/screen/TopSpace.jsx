import React from 'react'
import { styled } from 'styled-components'

function TopSpace() {
  return (
    <>
      <TopSpaceContainer>333</TopSpaceContainer>
    </>
  )
}

const TopSpaceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
`
export default TopSpace
