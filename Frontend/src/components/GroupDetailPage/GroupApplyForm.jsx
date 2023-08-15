import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import '../../components/GroupDetailPage/css/groupDetailStyle.css'
import { joinGroup } from '../../api/groupDetailApi'

const GTOUP_APPLY_ANSWER_LIMIT = 200

const GroupApplyForm = ({ question, setModalOpen }) => {
  const { groupId } = useParams()

  const [userAnswer, setUserAnswer] = useState('')

  const handleChange = (event) => {
    if (event.target.value.length > GTOUP_APPLY_ANSWER_LIMIT) {
      setUserAnswer(event.target.value.substr(0, GTOUP_APPLY_ANSWER_LIMIT))
    } else {
      setUserAnswer(event.target.value)
    }
  }

  const handleSubmit = async () => {
    try {
      await joinGroup(groupId, userAnswer)
      alert(
        '신청해주셔서 감사합니다. 모임 리더가 확인할 때까지 조금만 기다려주세요!',
      )
      setModalOpen(false)
    } catch (error) {
      console.log(error)
      alert('신청 중 에러가 발생했습니다. 잠시 뒤에 다시 신청해주세요.')
    }
  }

  return (
    <FormContainer>
      <h1 className="mt-none">함께하기</h1>
      <QuestionBox className="form-question">
        모임의 가입 동기를 자유롭게 써주세요.
      </QuestionBox>
      <textarea
        className="form-answer"
        rows="10"
        placeholder="답변을 입력해주세요."
        value={userAnswer}
        onChange={handleChange}
        spellCheck="false"
      ></textarea>
      <InputLengthInfo>
        ({userAnswer.length}/{GTOUP_APPLY_ANSWER_LIMIT})
      </InputLengthInfo>
      <FormButtonContainer>
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
      </FormButtonContainer>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  padding: 2.5rem;
`

const QuestionBox = styled.div`
  margin: 1rem 0;
`

const FormButtonContainer = styled.div`
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
