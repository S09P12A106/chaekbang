import React from 'react'
import { styled } from 'styled-components'

const Container = styled.div``
const TitleContainer = styled.div`
  margin-bottom: 3rem;
`
const Title = styled.div`
  display: flex;
  font-size: 2rem;
  line-height: 3rem;
  font-weight: 600;
`
const LeftTitle = styled.div`
  width: 0.8rem;
  background-color: #00bbc6;
  margin-right: 1rem;
`

const TimeContainer = styled.div`
  font-size: 0.8rem;
  line-height: 4rem;
  color: #989898;
  margin-left: 1rem;
  text-align: right;
`
const Time = styled.div``

function MeetingTitle({ meetingData }) {
  const arrDateToStringDate = (arr) => {
    return arr[0] + '.' + arr[1] + '.' + arr[2] + ' ' + arr[3] + ':' + arr[4]
  }

  return (
    <Container>
      <TitleContainer>
        <Title>
          <LeftTitle></LeftTitle>
          {meetingData.title}
        </Title>
        <TimeContainer>
          <div>
            {arrDateToStringDate(meetingData.startedAt)} ~
            {arrDateToStringDate(meetingData.closedAt)}
          </div>
        </TimeContainer>
      </TitleContainer>
    </Container>
  )
}

export default MeetingTitle
