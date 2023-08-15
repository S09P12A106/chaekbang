import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import LeaderInfo from '../GroupDetailPage/LeaderInfo'
import { serviceColor } from '../GroupDetailPage/groupDetailColors'
import COLORS from '../../constants/colors'
import { findLeader } from '../GroupDetailPage/util'
import { leaveGroup } from '../../api/groupHomeApi'
import Swal from 'sweetalert2'

const GroupHomeProfile = ({ group, membersInfo, isLeader }) => {
  const leader = findLeader(membersInfo.users, membersInfo.leaderId)
  const { groupId } = useParams()
  const navigate = useNavigate()

  const handleLeaveBtnClick = async () => {
    Swal.fire({
      title: '정말 모임을 나가시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '승인',
      cancelButtonText: '취소',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await leaveGroup(groupId)
          alert('그동안 함께해서 즐거웠습니다!')
          navigate('/')
        } catch (error) {
          console.log(error)
          alert('모임 나가기에 실패했습니다. 잠시 뒤에 다시 시도해주세요.')
        }
      }
    })
  }
  return (
    <ProfileGridBox>
      <div>
        {/* 이미지 컨테이너 */}
        <ProfileImg>
          <img src={`${group.imageUrl}`} alt="그룹 프로필 이미지" />
        </ProfileImg>
      </div>

      <div>
        <h1>{group.title}</h1>
        <p>
          현재{' '}
          <MemberCountHighlight>
            {membersInfo.users.length}
          </MemberCountHighlight>
          명이 함께하고 있어요
        </p>

        <TagList>
          {group.tags.map((tag, index) => {
            return <Tag key={index}>#{tag.tagName}</Tag>
          })}
        </TagList>

        <LeaderInfo leader={leader} />

        {!isLeader && (
          <GroupApplyButtons>
            {/* TODO: 색깔 상수로 바꾸기 */}
            <GroupButton color="red" text="white" onClick={handleLeaveBtnClick}>
              모임 나가기
            </GroupButton>
          </GroupApplyButtons>
        )}
      </div>
    </ProfileGridBox>
  )
}

const ProfileImg = styled.div`
  position: relative;
  height: 100%;
  img {
    /* max-width: ; */
    width: 100%;
    max-height: 37rem;
    /* height: 100%; */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    vertical-align: middle;
  }
`

const ProfileGridBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 3rem;
`

const MemberCountHighlight = styled.span`
  color: #00bbc6;
`

const TagList = styled.div`
  margin: 2rem 0;
`

const Tag = styled.span`
  background-color: ${COLORS.THEME_COLOR2};
  color: white;
  padding: 0.5rem;
  border-radius: 0.8rem;
  margin-right: 2rem;
`

const GroupApplyButtons = styled.div`
  text-align: right;
  margin: 5rem 4rem 2rem;
`

const GroupButton = styled.span`
  display: inline-block;
  padding: 0.5rem 1.3rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.text};
  text-align: center;
  margin-left: 2.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`

export default React.memo(GroupHomeProfile)
