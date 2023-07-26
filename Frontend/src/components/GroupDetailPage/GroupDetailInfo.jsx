import React from 'react'
import styled from 'styled-components'
import { GROUP_DETAIL_CONTAINER_PADDING } from './constant/groupDetailConstant'

const GroupDetailInfo = ({ detail }) => {
  return (
    <DetailInfoContainer>
      <h1>모임 정보</h1>
      <p>{detail}</p>
    </DetailInfoContainer>
  )
}

const DetailInfoContainer = styled.div`
  padding: ${GROUP_DETAIL_CONTAINER_PADDING};
`

export default GroupDetailInfo
