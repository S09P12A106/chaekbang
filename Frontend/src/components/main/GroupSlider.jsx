import React from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import GroupItem from '../common/GroupItem'
import SliderSkleton from './SliderSkleton'
import SkletonItem from '../common/SkletonItme'

const Container = styled.div`
  margin: 0;
  .group-item {
    margin: 10px;
  }
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 40px;
  .group-item {
    display: flex;
    justify-content: center;
    margin: 0;
  }
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
      breakpoint: 940,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinity: false,
        dots: true,
      },
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinity: false,
        dots: true,
      },
    },
  ],
}

const TitleSkeltonm = styled(SkletonItem)`
  width: 150px;
  height: 40px;
  margin: 10px;
`

function GroupSlider({ title, grops }) {
  return (
    <Container>
      {title == null ? <TitleSkeltonm /> : <Title>{title}</Title>}
      {grops == null ? (
        <SliderSkleton />
      ) : (
        <Slider {...setting} className="main-slider">
          {grops.map((group, index) => (
            <GroupItem group={group} key={index} />
          ))}
        </Slider>
      )}
    </Container>
  )
}

export default GroupSlider
