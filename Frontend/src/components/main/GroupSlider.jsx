import React from 'react'
import styled from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import GroupItem from '../common/GroupItem'

const Container = styled.div`
  margin: 0;
  .group-item {
    margin: 10px;
  }
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 40px;
`
const Title = styled.h2`
  margin-left: 10px;
  font-size: 2rem;
`

const setting = {
  infinity: false,
  dots: true,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinity: false,
        dots: true,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinity: false,
        dots: true,
      },
    },
  ],
}

function GroupSlider({ title, grops }) {
  return (
    <Container>
      <Title>{title}</Title>
      <Slider {...setting} className="main-slider">
        {grops.map((group, index) => (
          <GroupItem group={group} key={index} />
        ))}
      </Slider>
    </Container>
  )
}

export default GroupSlider