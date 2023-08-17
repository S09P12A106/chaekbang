import React from 'react'
import { styled } from 'styled-components'
import Opinion from './Opinion'

const Container = styled.div`
  // border-bottom: 1px solid #00bbc6;
  margin-bottom: 5rem;
`
const OpinionList = styled.div``
const TitleContainer = styled.div`
  display: flex;
  margin-top: 1rem;
`
const Title = styled.div`
  font-size: 1.8rem;
  padding: 1rem;
`

const LeftTitle = styled.div`
  width: 0.4rem;
  background-color: #00bbc6;
  margin-right: 0.1rem;
`

function OpinionBox({ opinionData }) {
  return (
    <Container>
      <TitleContainer>
        <LeftTitle></LeftTitle>
        <Title>{opinionData.topic}</Title>
      </TitleContainer>

      <OpinionList>
        {opinionData.opinions.map((opinion, index) => (
          <Opinion
            oneOpinion={opinion}
            key={index}
            left={index % 2 === 0}
          ></Opinion>
        ))}
      </OpinionList>
    </Container>
  )
}

export default OpinionBox
