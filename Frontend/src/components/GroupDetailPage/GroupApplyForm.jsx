import React, { useState } from 'react'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import '../../components/GroupDetailPage/css/groupDetailStyle.css'

const GTOUP_APPLY_ANSWER_LIMIT = 200

const GroupApplyForm = ({ question, setModalOpen }) => {
  const [userAnswer, setUserAnswer] = useState('')

  const handleChange = (event) => {
    if (event.target.value.length > GTOUP_APPLY_ANSWER_LIMIT) {
      setUserAnswer(event.target.value.substr(0, GTOUP_APPLY_ANSWER_LIMIT))
    } else {
      setUserAnswer(event.target.value)
    }
  }

  const handleSubmit = () => {
    // 서버로 보낼 데이터 객체 생성
    const dataToSend = { userAnswer: userAnswer }

    // 서버로 데이터 전송
    console.log('Backend로 가입 데이터 전송!!')
    console.log(dataToSend)
    console.log('전송 완료!')
  }

  return (
    <FromContainer>
      <h1 className="mt-none">함께하기</h1>
      <p className="form-question">{question}</p>
      <textarea
        className="form-answer"
        rows="10"
        placeholder="답변을 입력해주세요."
        value={userAnswer}
        onChange={handleChange}
        spellcheck="false"
      ></textarea>
      <InputLengthInfo>
        ({userAnswer.length}/{GTOUP_APPLY_ANSWER_LIMIT})
      </InputLengthInfo>
      {/* <input className="form-answer" type="text" placeholder="입력해주세요." /> */}
      <FromButtonContainer>
        <FormButton
          color={COLORS.WHITE}
          text={COLORS.MODAL_CANCEL_GREY}
          border
          onClick={() => setModalOpen(false)}
        >
          취소
        </FormButton>
        <FormButton
          color={COLORS.THEME_COLOR2}
          text={COLORS.WHITE}
          onClick={handleSubmit}
        >
          신청하기
        </FormButton>
      </FromButtonContainer>
    </FromContainer>
  )
}

const FromContainer = styled.div`
  padding: 2.5rem;
`
const FromButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  margin-top: 1rem;
`

const FormButton = styled.div`
  display: inline-block;
  justify-self: center;
  background-color: ${(props) => props.color};
  color: ${(props) => props.text};
  width: 10rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  border: ${(props) =>
    props.border === undefined
      ? 'none'
      : `1px solid ${COLORS.MODAL_CANCEL_BORDER}`};
  cursor: pointer;
`

const InputLengthInfo = styled.div`
  text-align: right;
  color: grey;
  font-size: 0.7rem;
`

export default React.memo(GroupApplyForm)
