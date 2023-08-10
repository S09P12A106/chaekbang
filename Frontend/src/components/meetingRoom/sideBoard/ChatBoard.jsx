import React, { useContext, useState, useEffect, useRef } from 'react'
import { styled } from 'styled-components'
import COLORS from '../../../constants/colors'
import { BiSolidRightArrow } from 'react-icons/bi'
import { BoardContext } from '../context/BoardContext'

function ChatBoard() {
  // const [message, setMessage] = useState('')
  // const [messageHistory, setMessageHistory] = useState([])
  const { whichBtn, meetingInfoState } = useContext(BoardContext)
  const [isToggleOpen, setIsToggleOpen] = useState(false)
  // const { session, publisher } = meetingInfo

  // const input = useRef()
  // const chattingLog = useRef()
  const [chat, setChat] = useState({
    messageList: [],
    message: '',
  })

  const session = meetingInfoState[0].session

  // const session = meetingInfoState.session
  // const publisher = meetingInfoState.publisher
  const { messageList, message } = chat

  const convertTime = () => {
    const dateObject = new window.Date()

    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    const period = hours >= 12 ? '오후' : '오전'
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes

    return `${period} ${formattedHours}:${formattedMinutes}`
  }

  useEffect(() => {
    if (whichBtn === 0) {
      setIsToggleOpen(true)
    } else {
      setIsToggleOpen(false)
    }
  }, [whichBtn])

  useEffect(() => {
    const handleChatSignal = (event) => {
      const data = JSON.parse(event.data)
      // 새 메시지를 추가하도록 업데이트
      setChat((prev) => ({
        ...prev,
        messageList: [
          ...prev.messageList,
          {
            connectionId: event.from.connectionId,
            nickname: data.nickname,
            message: data.message,
            time: data.date,
          },
        ],
      }))
      scrollToBottom()
    }

    session.on('signal:cheakbang-chat', handleChatSignal)

    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 해제
      session.off('signal:cheakbang-chat', handleChatSignal)
    }
  }, [session])

  // 메세지 보내기
  const sendMessage = () => {
    if (chat.message.trim() === '') return

    // const nowDate = new Date()
    // console.log('date ' + nowDate)

    const data = {
      message: chat.message,
      nickname: meetingInfoState[0].myUserName, // redux에서 불러올 것
      date: convertTime(),
    }

    // 메세지 데이터 보내기
    session
      .signal({
        data: JSON.stringify(data),
        type: 'cheakbang-chat',
      })
      .then(() => {
        console.log('Message successfully sent')
      })
      .catch((error) => {
        console.error(error)
      })
    setChat((prev) => ({
      ...prev,
      message: '',
    }))
  }
  const chattingLog = useRef()
  const handleInputChange = (event) => {
    setChat((prev) => ({
      ...prev,
      message: event.target.value,
    }))
  }

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      console.log('핸들인풋키프레스')
      sendMessage()
      event.target.value = ''
    }
  }

  // 채팅칠 때 최신 메세지 위치로 내려가도록
  function scrollToBottom() {
    setTimeout(() => {
      try {
        chattingLog.current.scrollTop = chattingLog.current.scrollHeight
      } catch (err) {}
    }, 20)
  }

  return (
    <ChatContainer toggle={isToggleOpen}>
      <WhiteBoard>
        <Title>회의 중 메세지</Title>
        <MessageBoard ref={chattingLog}>
          <Notice>
            메세지는 통화 중인 사람에게만 표시되며 통화가 끝나면 삭제됩니다.
          </Notice>
          <MessageBox>
            {messageList.map((message, index) => (
              <div className="box" key={index}>
                <UpperSession>
                  <Username>{message.nickname}</Username>
                  <Date>{message.time}</Date>
                </UpperSession>
                <Text>{message.message}</Text>
              </div>
            ))}
          </MessageBox>
        </MessageBoard>
      </WhiteBoard>
      <InputBox>
        <Input
          spellCheck="false"
          type="textarea"
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          placeholder="메세지를 입력해주세요"
        ></Input>
        <InputBtn onClick={sendMessage}>
          <BiSolidRightArrow />
        </InputBtn>
      </InputBox>
    </ChatContainer>
  )
}

const ChatContainer = styled.div`
  position: fixed;
  right: ${(props) => (props.toggle ? '25px' : '-300px')};
  top: 0px;
  transition: right 0.5s ease;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
  height: calc(100vh - 20px);

  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  background-color: ${COLORS.WHITE};
  margin: 10px 0px;
  padding-right: 40px;
`

const WhiteBoard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Title = styled.div`
  margin: 20px 0px 10px;
  font-size: 20px;
`
const Notice = styled.div`
  font-size: 12px;
  margin: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${COLORS.BRIGHTGREY};
`
const MessageBoard = styled.div`
  max-height: 450px;
  overflow-y: auto; /* 세로 방향으로 스크롤이 생기도록 설정 */
  padding: 5px; /* 내용이 스크롤 바 아래에 가려지지 않도록 padding 추가 */
  box-sizing: border-box; /* padding을 포함한 크기로 요소를 계산 */

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.BRIGHTBLACK};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.BRIGHTGREY};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px ${COLORS.WHITE};
  }
`

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .box {
    margin: 5px;
    width: calc(100%-10px);
  }
`
const UpperSession = styled.div`
  display: flex;
  flex-direction: row;
`

const Username = styled.div`
  font-size: 12px;
`
const Date = styled.div`
  font-size: 10px;
  margin-left: 5px;
  margin-top: 2px;
  color: ${COLORS.GREY};
`
const Text = styled.div`
  margin: 5px;
  font-size: 16px;
`

const InputBox = styled.div`
  display: flex;
  /* display: contents; */
  flex-direction: row;

  align-items: center;
  margin: 15px;
  border-radius: 15px;
  background-color: #d5d5d5;
`
const Input = styled.textarea`
  margin-left: 5px;
  padding: 5px;
  border: none;
  border-radius: 15px;
  min-height: 75px;
  width: 180px;
  background-color: #d5d5d5;
  outline: none;
  resize: none;

  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${COLORS.BRIGHTBLACK};
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: ${COLORS.BRIGHTGREY};
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px ${COLORS.WHITE};
  }
`

const InputBtn = styled.button`
  display: inline-block;
  margin-left: 10px 0 5px;
  background-color: #d5d5d5;
  color: ${COLORS.BRIGHTBLACK};
`

export default ChatBoard
