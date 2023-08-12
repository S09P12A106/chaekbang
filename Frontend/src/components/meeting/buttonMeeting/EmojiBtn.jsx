import React, { useState } from 'react'
import BtnCustom from './_Btn'
import COLORS from '../../../constants/colors'
import styled from 'styled-components'
import { BoardContext } from '../../meetingRoom/context/BoardContext'

function EmojiBtn() {
  const [isOpen, setIsOpen] = useState(false)
  const { client } = useContext(BoardContext)

  const emojis = [
    String.fromCharCode(0x1f604), // 웃는 얼굴
    String.fromCharCode(0x1f605), // 진땀
    String.fromCharCode(0x1f44d), // 오케이
    String.fromCharCode(0x1f47f), // 엥그리 데빌
    String.fromCharCode(0x1f44d), // 따봉
    String.fromCharCode(0x1f44f), // 박수
    String.fromCharCode(0x1f44b), // 손 흔들기
  ]

  const toggleEmojiList = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const sendEmojiInfo = (emoji) => {
    // 소켓을 사용하여 emoji에 대한 정보를 전송
    client.publish({
      destination: '/app/emoji/sendEmoji',
      body: JSON.stringify({
        type: 'emoji',
        emoji: emoji,
      }),
    })
    console.log(`Sending emoji info: ${emoji}`)
    // 소켓 코드 추가
  }

  return (
    <>
      {isOpen && (
        <EmojiList>
          {emojis.map((emoji, index) => (
            <Emoji key={index} onClick={() => sendEmojiInfo(emoji)}>
              {emoji}
            </Emoji>
          ))}
        </EmojiList>
      )}
      <BtnCustom
        BtnImg={SMILE}
        color={COLORS.YELLOW}
        onClick={toggleEmojiList}
      ></BtnCustom>
    </>
  )
}

const EmojiList = styled.div`
  /* 스타일을 추가하세요 */
`

const Emoji = styled.span`
  font-size: 24px;
  margin: 4px;
`

export default EmojiBtn
