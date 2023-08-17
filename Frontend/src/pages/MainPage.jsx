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
import { useDispatch, useSelector } from 'react-redux'
import { clearToken } from '../utils/tokenUtil'
import { logoutAction } from '../store/LoginUser'

import LoadingItem from '../components/common/LoadingItem'

const Container = styled.div``

const InnerContainer = styled.div`
  height: auto;
  padding: 0 10px;
`

function MainPage() {
  const [popularGroup, setPopularGroups] = useState(null)
  const [recommendTag, setRecommendTag] = useState(null)
  const [myGroup, setMyGroup] = useState(null)
  const [recommendGroup, setRecommendGroup] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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
      try {
        const data = await getMyGroupsApi()
        setMyGroup(data.data)
      } catch (e) {
        if (e.response && e.response.status === 401) {
          // 앞에 user가 있는지 체크했는데, 401 에러가 발생하면.. 로컬 스토리지 && 리덕스 동기화 문제.
          clearToken()
          dispatch(logoutAction())
        }
      }
    }
    getPopularGroups()
    getRecommendTagAndGroups()
    if (user != null) {
      getMyGroup()
    }
  }, [])
  if (!popularGroup || !recommendGroup) {
    return <LoadingItem></LoadingItem>
  }
  return (
    <MainLayout>
      <Container>
        <Banner />
        <hr />
        <InnerContainer>
          <GroupSlider title={'인기모임'} groups={popularGroup} />
          <GroupSlider title={recommendTag} groups={recommendGroup} />
          {myGroup && <GroupSlider title={'내모임'} groups={myGroup} />}
        </InnerContainer>
      </Container>
    </MainLayout>
  )
}

export default MainPage
