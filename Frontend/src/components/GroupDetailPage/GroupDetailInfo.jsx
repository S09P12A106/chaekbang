import React from 'react'
import styled from 'styled-components'

const GroupDetailInfo = ({ detail }) => {
  return (
    <DetailInfoContainer>
      <h1>모임 정보</h1>
      <p>{detail}</p>
    </DetailInfoContainer>
  )
}

const DetailInfoContainer = styled.div`
  padding: 0 4rem;
`

export default GroupDetailInfo
