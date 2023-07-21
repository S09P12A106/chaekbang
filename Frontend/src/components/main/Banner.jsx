import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  margin: 30px 0px;
  padding: 0px 10px;
  img {
    width: 100%;
    max-height: 600px;
    min-height: 300px;
    object-fit: cover;
  }
`
function Banner() {
  const dummyUrl =
    'https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/09/reading-book-1296x728-header.jpg?w=1155&h=1528'
  return (
    <Container>
      <img src={dummyUrl} alt="banner" />
    </Container>
  )
}

export default Banner
