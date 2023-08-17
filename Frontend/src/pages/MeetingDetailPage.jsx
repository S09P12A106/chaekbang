import React, { useEffect, useState } from 'react'
import MainLayout from '../components/Layout/MainLayout'
import { styled } from 'styled-components'
import MeetingUser from '../components/MeetingDetailPage/MeetingUser'
import MeetingTitle from '../components/MeetingDetailPage/MeetingTitle'
import OpinionBoxes from '../components/MeetingDetailPage/OpinionBoxes'
import { jwtBackApiInstance } from '../api/http'
import { useNavigate } from 'react-router-dom'
import LoadingItem from '../components/common/LoadingItem'

const Container = styled.div`
  margin-top: 5rem;
  margin-left: 5rem;
  margin-right: 5rem;
`

function MeetingDetailPage() {
  const [meetingInfo, setMeetingInfo] = useState(null)
  const currentUrlSplited = window.location.href.split('/')
  const groupId = currentUrlSplited[currentUrlSplited.length - 3]
  const meetingId = currentUrlSplited[currentUrlSplited.length - 1]
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setMeetingInfo(null)
        const jwtHttp = jwtBackApiInstance()
        const URL = `api/groups/${groupId}/meetings/${meetingId}`
        const response = await jwtHttp.get(URL)
        setMeetingInfo(response.data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login')
        } else {
          navigate('/error')
        }
      }
    }
    fetchData()
  }, [])

  if (meetingInfo === null) {
    return <LoadingItem></LoadingItem>
  }

  return (
    <MainLayout>
      <Container>
        <MeetingTitle
          meetingData={{
            title: meetingInfo.title,
            startedAt: meetingInfo.startedAt,
            closedAt: meetingInfo.closedAt,
          }}
        ></MeetingTitle>
        <MeetingUser userData={meetingInfo.participation}></MeetingUser>
        <OpinionBoxes opinionData={meetingInfo.opinionBoxes}></OpinionBoxes>
      </Container>
    </MainLayout>
  )
}

export default MeetingDetailPage
