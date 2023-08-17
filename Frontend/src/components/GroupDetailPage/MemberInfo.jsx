import React from 'react'
import styled from 'styled-components'

const MemberInfo = ({ member }) => {
  return (
    <MemberInfoContainer>
      <FlexBox>
        <ProfileImg>
          <img src={member.profileImageUrl} alt="member image" />
        </ProfileImg>
        <MemberInfoBox>
          {/* <FlexBox>
          <h3>{member.nickname}</h3>
          <p>{member.groupCount}개의 모임을 참여했어요!</p>
        </FlexBox> */}
          <h3>{member.nickname}</h3>
          <p>{member.groupCount}개의 모임을 참여했어요!</p>
        </MemberInfoBox>
      </FlexBox>
    </MemberInfoContainer>
  )
}

const MemberInfoContainer = styled.div`
  display: inline-block;
  padding: 1rem;
`

const ProfileImg = styled.div`
  display: inline-block;
  text-align: center;
  margin-right: 1rem;

  img {
    width: 5rem;
    border-radius: 10%;
  }
`

const MemberInfoBox = styled.div`
  display: inline-block;

  h3 {
    margin-bottom: 0;
  }
  p {
    margin-top: 0;
  }
`

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`

export default MemberInfo
