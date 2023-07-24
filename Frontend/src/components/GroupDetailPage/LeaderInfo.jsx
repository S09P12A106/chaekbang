import React from 'react'
import styled from 'styled-components'

const LeaderInfo = ({ leader }) => {
  return (
    <LeaderInfoContainer>
      <h2>
        모임장{' '}
        <LeaderNicknameHighlight>{leader.nickname}</LeaderNicknameHighlight>를
        소개합니다.
      </h2>
      <LeaderProfileImg>
        <div className="image-container">
          <img src={`${leader.profileImageUrl}`} alt="리더 프로필 이미지" />
        </div>
      </LeaderProfileImg>
      <AboutmeHighlight>{leader.aboutMe}</AboutmeHighlight>
    </LeaderInfoContainer>
  )
}

const LeaderInfoContainer = styled.div`
  text-align: center;
`

const LeaderProfileImg = styled.div`
  img {
    width: 50%;
    width: 8rem;
    height: 8rem;
    border-radius: 1rem;
    overflow: hidden;
    border: 0.01rem solid white;
    box-shadow: 0 0.2rem 0.3rem 0.1rem gray;
  }

  .image-container {
    margin: 0 auto;
    text-align: center;
    justify-content: center;
  }
`

const LeaderNicknameHighlight = styled.span`
  color: #7704ac;
`

const AboutmeHighlight = styled.div`
  color: #707070;
  margin: 1rem 0;
  padding: 0 5rem;
`

export default LeaderInfo
