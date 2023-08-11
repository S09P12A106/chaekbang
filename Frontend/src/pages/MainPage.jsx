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
import { getUserInfoApi } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const Container = styled.div`
  height: auto;
  padding: 0 10px;
`

function MainPage() {
  const [popularGroup, setPopularGroups] = useState(null)
  const [recommendTag, setRecommendTag] = useState(null)
  const [recommendGroup, setRecommendGroup] = useState(null)
  const navigate = useNavigate()
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
    getPopularGroups()
    getRecommendTagAndGroups()
  }, [])

  return (
    <MainLayout>
      <Container>
        <Banner />
        <hr />
        <GroupSlider title={'인기모임'} grops={popularGroup} />
        <GroupSlider title={recommendTag} grops={recommendGroup} />
        <GroupSlider title={'내모임'} grops={getListGroup(8)} />
      </Container>
    </MainLayout>
  )
}

export default MainPage
