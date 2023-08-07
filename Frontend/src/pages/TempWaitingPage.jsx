import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { OpenVidu } from 'openvidu-browser'

const TempWaitingPage = () => {
  const navigate = useNavigate()
  function joinMeeting() {
    window.location.href = '/mw'
  }
  return (
    <div>
      <h1>대기실</h1>
      <Button onClick={joinMeeting}>Join Meeting!</Button>
    </div>
  )
}

const Button = styled.div`
  width: 5rem;
  background-color: aquamarine;
  margin: 1rem auto;
`

export default TempWaitingPage
