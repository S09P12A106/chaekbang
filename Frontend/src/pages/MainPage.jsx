import React from 'react'
import GroupSlider from '../components/main/GroupSlider'
import { getListGroup } from '../components/main/GroupDummydata'
import styled from 'styled-components'
import Banner from '../components/main/Banner'

const Container = styled.div`
  height: auto;
`

function MainPage() {
  return (
    <Container className="container">
      <Banner />
      <hr />
      <GroupSlider title={'인기모임'} grops={getListGroup(8)} />
      <GroupSlider title={'#인문학'} grops={getListGroup(8)} />
      <GroupSlider title={'내모임'} grops={getListGroup(8)} />
    </Container>
  )
}

export default MainPage
