import React, { useState } from 'react'
import SMILE from '../../../assets/meetingbtn/smile.png'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'
import { styled } from 'styled-components'

function EmojiBtnInWaitingRoom() {
  const [isOpen, setIsOpen] = useState(false)

  const emojis = [
    String.fromCodePoint(0x1f604), // 웃는 얼굴
    String.fromCodePoint(0x1f622), // 눈물
    String.fromCodePoint(0x1f47f), // 엥그리 데빌
    String.fromCodePoint(0x1f648), // 몽키
    String.fromCodePoint(0x1f44d), // 따봉
    String.fromCodePoint(0x1f44f), // 박수
    String.fromCodePoint(0x1f44b), // 손 흔들기
  ]

  const toggleEmojiList = () => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = !prevIsOpen
      return newIsOpen // 상태 업데이트 결과를 반환
    })
  }

  // 이모지 선택 후 보내기
  const selectEmoji = () => {
    alert('입장 후 사용해주세요!')
  }

  return (
    <>
      {isOpen && (
        <EmojiList>
          {emojis.map((emoji, index) => (
            <Emoji
              key={index}
              onClick={() => selectEmoji()} // 함수를 참조로 할당
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

export default EmojiBtnInWaitingRoom
