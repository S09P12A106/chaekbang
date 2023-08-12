import React from 'react'
import styled from 'styled-components'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import SliderSkleton from './SliderSkleton'
import SkletonItem from '../common/SkletonItme'
import GroupList from './GroupList'
import { useMediaQuery } from 'react-responsive'
const Container = styled.div`
  margin: 0;
  overflow-x: hidden;
  overflow-y: hidden;
  padding-bottom: 40px;
`
const Title = styled.h2`
  margin-left: 10px;
  font-size: 2rem;
  margin-top: 20px;
  margin-bottom: 20px;
`

const setting = {
  infinity: false,
  dots: true,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const TitleSkeltonm = styled(SkletonItem)`
  width: 150px;
  height: 40px;
  margin: 10px;
`

function GroupSlider({ title, groups }) {
  const isDesktop = useMediaQuery({
    query: '(min-width:940px)',
  })

  const isTable = useMediaQuery({
    query: '(min-width:700px) and (max-width:939px)',
  })

  const isMobile = useMediaQuery({
    query: '(max-width:699px)',
  })

  function GroupSlice(groups) {
    let chunk = isDesktop ? 4 : isTable ? 3 : 2
    // 배열을 받아서 입력 단위로 끊어서 리턴함.
    const groupArray = []
    for (let index = 0; index < groups.length; index += chunk) {
      let tempArray
      // slice() 메서드를 사용하여 특정 길이만큼 배열을 분리함
      tempArray = groups.slice(index, index + chunk)
      // 빈 배열에 특정 길이만큼 분리된 배열을 추가
      groupArray.push(tempArray)
    }
    return groupArray
  }

  return (
    <Container>
      {title == null ? <TitleSkeltonm /> : <Title>{title}</Title>}
      {groups == null ? (
        <SliderSkleton />
      ) : groups.length == 0 ? (
        <div>모임 정보가 없습니다.</div>
      ) : (
        <Slider {...setting} className="main-slider">
          {GroupSlice(groups).map((groupList, index) => (
            <GroupList groupList={groupList} key={index} />
          ))}
        </Slider>
      )}
    </Container>
  )
}

export default GroupSlider
