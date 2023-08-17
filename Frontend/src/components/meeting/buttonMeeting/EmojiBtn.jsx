import React, { useState, useEffect, useContext } from 'react'
import SMILE from '../../../assets/meetingbtn/smile.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'
import { styled, keyframes } from 'styled-components'
import { SocketContext } from '../../../modules/SocketContext'
import { BoardContext } from '../../meetingRoom/context/BoardContext'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function EmojiBtn() {
  const [isOpen, setIsOpen] = useState(false)
  const [animationQueue, setAnimationQueue] = useState([])
  const { client, EmojiInfo } = useContext(SocketContext)
  const { meetingId } = useContext(BoardContext)
  const navigate = useNavigate()

  const user = useSelector((state) => {
    return state.rootReducer.loginReducer.user
  })

  const emojis = [
    String.fromCodePoint(0x1f604), // 웃는 얼굴
    String.fromCodePoint(0x1f622), // 눈물
    String.fromCodePoint(0x1f47f), // 엥그리 데빌
    String.fromCodePoint(0x1f648), // 몽키
    String.fromCodePoint(0x1f44d), // 따봉
    String.fromCodePoint(0x1f44f), // 박수
    String.fromCodePoint(0x1f44b), // 손 흔들기
  ]

  // 누군가(나 포함) 보낸 이모지 받기
  useEffect(() => {
    setAnimationQueue((prevQueue) => {
      const newQueue = [
        ...prevQueue,
        { emoji: EmojiInfo.emoji, nickname: EmojiInfo.nickname },
      ]
      return newQueue
    })
  }, [EmojiInfo])

  const toggleEmojiList = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen
      return newIsOpen
    })
  }

  // 이모지 선택 후 보내기
  const selectEmoji = (index) => {
    const sentEmoji = emojis[index]

    // 보내기
    try {
      if (client) {
        client.publish({
          destination: `/ws/pub/meeting/${meetingId}/emoji`,
          body: JSON.stringify({
            nickname: user.nickname,
            emoji: sentEmoji,
          }),
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {isOpen && (
        <EmojiList>
          {emojis.map((emoji, index) => (
            <Emoji
              key={index}
              onClick={() => selectEmoji(index)} // 함수를 참조로 할당
            >
              {emoji}
            </Emoji>
          ))}
        </EmojiList>
      )}
      <BtnCustom
        BtnImg={SMILE}
        color={COLORS.YELLOW}
        func={toggleEmojiList}
      ></BtnCustom>
      <SPOT>
        {animationQueue.map((value, index) => {
          return (
            <ClickedEmoji key={index}>
              {value.emoji}
              {value.nickname}
              {/* <ShowEmoji>{value.emoji}</ShowEmoji>
              <ShowNickname>{value.nickname}</ShowNickname> */}
            </ClickedEmoji>
          )
        })}
      </SPOT>
    </>
  )
}

const EmojiList = styled.div`
  /* 스타일을 추가하세요 */
  position: absolute;
  bottom: 100px;
  background-color: #4d4d4d;
  border-radius: 15px;
  height: 45px;
  width: 300px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  z-index: 300;
`

const Emoji = styled.span`
  font-size: 24px;
  margin: 4px;

  &:hover {
    cursor: pointer;
  }
`

// 서서히 사라지는 애니메이션
const fadeInOut = keyframes`
  100% {
    opacity: 0;
  }
  0% {
    opacity: 1;
  }
`
const ClickedEmoji = styled.div`
  color: white;
  font-size: 12px;
  position: fixed;
  display: flex;
  flex-direction: row;
  /* top: 100%; */
  left: -150px;
  width: 200px;
  transform: translateX(100%);
  font-size: 24px;
  animation:
    ${fadeInOut} 2s ease-in-out,
    rise 2s forwards;
  opacity: 0;

  @keyframes rise {
    from {
      top: 80%;
    }
    to {
      top: 60%;
    }
  }
`
const SPOT = styled.div`
  position: absolute;
  left: 0px;
  bottom: 100px;
  /* margin: 30px; */
  z-index: 400;
`

export default EmojiBtn
