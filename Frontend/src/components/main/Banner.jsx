import React from 'react'
import styled from 'styled-components'
import BannerUrl from '../../assets/Banner.png'

const Container = styled.div`
  width: 100%;
  margin: 30px 0px;
  padding: 0px 10px;
  img {
    width: 100%;
    max-height: 400px;
    min-height: 300px;
    object-fit: cover;
  }
`
function Banner() {
  return (
    <Container>
      <img src={BannerUrl} alt="banner" />
    </Container>
  )
}

export default React.memo(Banner)
