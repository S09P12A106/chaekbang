import React from 'react'
import { styled } from 'styled-components'
import OpinionBox from './OpinionBox'

const Container = styled.div`
  margin-top: 4rem;
`
const Title = styled.div`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  margin-left: 1rem;
  font-weight: 600;
`
const Hr = styled.hr`
  color: #d8d8d8;
`
const OpinionBoxList = styled.div``

function OpinionBoxes({ opinionData }) {
  return (
    <Container>
      <Title>의견모집함</Title>
      <Hr></Hr>
      <OpinionBoxList>
        {opinionData.map((opinionBox, index) => (
          <OpinionBox opinionData={opinionBox} key={index}></OpinionBox>
        ))}
      </OpinionBoxList>
    </Container>
  )
}

export default OpinionBoxes
