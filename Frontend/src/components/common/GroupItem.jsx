import React from 'react'
import styled from 'styled-components'
import Tag from './Tag'
import COLORS from '../../constants/colors'
import EyeIcon from '../../assets/Eye.svg'
import convertShortNumber from '../../utils/convertShortNumber'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Container = styled.div`
  width: 220px;

  .green {
    color: ${COLORS.THEME_COLOR2};
  }

  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Image = styled.img`
  width: 220px;
  height: 220px;
  cursor: pointer;
  border-radius: 20px;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  margin: 5px 0px 0px 5px;
`

const ShowUserCountBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0px 0px 5px;
  font-size: 0.7rem;
  color: ${COLORS.GREY};
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 5px 0px 5px 5px;

  div {
    margin-top: 5px;
    margin-right: 5px;
  }
`
const ShowUser = styled.div`
  display: inline-block;
`
const ViewCount = styled.div`
  display: inline-flex;
  align-items: center;
`

function GroupItem({ group }) {
  const groupId = group.groupId

  const navigate = useNavigate()
  const toDetailPage = (e) => {
    navigate(`/groups/detail/${groupId}`)
  }

  return (
    <Container className="group-item">
      <Image src={group.imageUrl} onClick={toDetailPage} />
      <Title onClick={toDetailPage}>{group.title}</Title>
      <ShowUserCountBlock>
        <ShowUser>
          현재 <span className="green">{group.joinedUserCount}</span>명이
          함께하고있어요
        </ShowUser>
        <ViewCount>
          <img src={EyeIcon} />
          <span>{convertShortNumber(group.readCount)}</span>
        </ViewCount>
      </ShowUserCountBlock>
      <TagList>
        {group.tags &&
          group.tags.map((tag, index) => (
            <Tag
              value={{ tagName: tag.tagName, tagId: tag.tagId }}
              key={index}
            ></Tag>
          ))}
      </TagList>
    </Container>
  )
}

export default GroupItem
