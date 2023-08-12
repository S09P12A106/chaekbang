import React, { useEffect, useState } from 'react'
import GroupSlider from '../components/main/GroupSlider'
import { getListGroup } from '../components/main/GroupDummydata'
import styled from 'styled-components'
import Banner from '../components/main/Banner'
import MainLayout from '../components/Layout/MainLayout'
import {
  getPopularGroupsApi,
  getRecommendedTagAndGroupsApi,
} from '../api/mainApi'
import { useNavigate } from 'react-router-dom'
import { getMyGroupsApi } from '../api/myGroupApi'
import { useSelector } from 'react-redux'

const Container = styled.div`
  height: auto;
  padding: 0 10px;
`

function MainPage() {
  const [popularGroup, setPopularGroups] = useState(null)
  const [recommendTag, setRecommendTag] = useState(null)
  const [myGroup, setMyGroup] = useState(null)
  const [recommendGroup, setRecommendGroup] = useState(null)
  const navigate = useNavigate()
  const user = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  useEffect(() => {
    async function getPopularGroups() {
      const data = await getPopularGroupsApi()
      setPopularGroups(data.data)
    }
    async function getRecommendTagAndGroups() {
      const data = await getRecommendedTagAndGroupsApi()
      const { tagName, groups } = data.data
      setRecommendTag('#' + tagName)
      setRecommendGroup(groups)
    }
    async function getMyGroup() {
      const data = await getMyGroupsApi()
      setMyGroup(data.data)
    }
    getPopularGroups()
    getRecommendTagAndGroups()
    if (user != null) {
      getMyGroup()
    }
  }, [])

  return (
    <MainLayout>
      <Container>
        <Banner />
        <hr />
        <GroupSlider title={'인기모임'} groups={popularGroup} />
        <GroupSlider title={recommendTag} groups={recommendGroup} />
        {myGroup && <GroupSlider title={'내모임'} groups={myGroup} />}
      </Container>
    </MainLayout>
  )
}

export default MainPage
