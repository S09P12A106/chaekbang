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
          if (error.response && error.response.status === 401) {
            navigate('/login')
          } else {
            navigate('/error')
          }
        }
      }
    })
  }

  const toManagePage = () => {
    navigate(`/groups/${groupId}/manage`)
  }

  const toCreateMeetingPage = () => {
    navigate(`/groups/${groupId}/meetings/create`)
  }

  return (
    <ProfileGridBox>
      <ImageContainer>
        {/* 이미지 컨테이너 */}
        <ProfileImg>
          <img src={`${group.imageUrl}`} alt="그룹 프로필 이미지" />
        </ProfileImg>
      </ImageContainer>

      <InfoContainer>
        <InfoInnerContainer>
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
              <GroupButton
                $color={COLORS.RED_ACTIVE}
                $text={COLORS.BLACK}
                onClick={handleLeaveBtnClick}
              >
                모임 나가기
              </GroupButton>
            </GroupApplyButtons>
          )}
          {isLeader && (
            <GroupApplyButtons>
              <GroupButton
                $color="#00BBC6"
                $text="white"
                onClick={toManagePage}
              >
                모임 관리하기
              </GroupButton>
              <GroupButton
                $color="#00BBC6"
                $text="white"
                onClick={toCreateMeetingPage}
              >
                책방 생성하기
              </GroupButton>
            </GroupApplyButtons>
          )}
        </InfoInnerContainer>
      </InfoContainer>
    </ProfileGridBox>
  )
}

const ImageContainer = styled.div`
  flex-basis: 50%;
  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const InfoContainer = styled.div`
  flex-basis: 50%;
  @media (max-width: 700px) {
    flex-basis: 100%;
  }
`

const InfoInnerContainer = styled.div`
  padding-left: 20px;
`

const ProfileImg = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
  }
`
const ProfileGridBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`

const MemberCountHighlight = styled.span`
  color: #00bbc6;
`

const TagList = styled.div`
  margin: 2rem 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`

const Tag = styled.span`
  background-color: ${COLORS.THEME_COLOR2};
  color: white;
  padding: 0.5rem;
  border-radius: 0.8rem;
  margin-right: 8px;
  margin-bottom: 8px;
`

const GroupApplyButtons = styled.div`
  text-align: right;
  margin-top: 4rem;
  padding-right: 1rem;
  display: flex;
  justify-content: right;
`

const GroupButton = styled.span`
  display: inline-block;
  padding: 0.5rem 0.8rem;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.$text};
  text-align: center;
  margin-left: 1rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
`

export default React.memo(GroupHomeProfile)
