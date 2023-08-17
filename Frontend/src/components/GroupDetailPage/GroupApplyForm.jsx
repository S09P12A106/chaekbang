import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import COLORS from '../../constants/colors'
import '../../components/GroupDetailPage/css/groupDetailStyle.css'
import { joinGroup } from '../../api/groupDetailApi'

const GTOUP_APPLY_ANSWER_LIMIT = 200

const GroupApplyForm = ({ question, setModalOpen }) => {
  const { groupId } = useParams()

  const [userAnswer, setUserAnswer] = useState('')
  const navigate = useNavigate()

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
      if (error.response && error.response.status === 401) {
        navigate('/login')
      } else {
        navigate('/error')
      }
    }
  }

  return (
    <FormContainer>
      <h1 className="mt-none">함께하기</h1>
      <QuestionBox className="form-question">
        모임의 가입 동기를 자유롭게 써주세요.
      </QuestionBox>
      <TextArea
        className="form-answer"
        rows="10"
        placeholder="답변을 입력해주세요."
        value={userAnswer}
        onChange={handleChange}
        spellCheck="false"
      ></TextArea>
      <InputLengthInfo>
        ({userAnswer.length}/{GTOUP_APPLY_ANSWER_LIMIT})
      </InputLengthInfo>
      <FormButtonContainer>
        <FormButton
          $color={COLORS.WHITE}
          $text={COLORS.MODAL_CANCEL_GREY}
          $border
          onClick={() => setModalOpen(false)}
        >
          취소
        </FormButton>
        <FormButton
          $color={COLORS.THEME_COLOR2}
          $text={COLORS.WHITE}
          onClick={handleSubmit}
        >
          신청하기
        </FormButton>
      </FormButtonContainer>
    </FormContainer>
  )
}

const TextArea = styled.textarea`
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
`

const FormContainer = styled.div`
  padding: 2.5rem;
`

const QuestionBox = styled.div`
  margin: 1rem 0;
`

const FormButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

const FormButton = styled.div`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  justify-self: center;
  background-color: ${(props) => props.$color};
  color: ${(props) => props.$text};
  width: 7rem;
  height: 3rem;
  line-height: 3rem;
  border-radius: 0.5rem;
  text-align: center;
  border: ${(props) =>
    props.$border === undefined
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
