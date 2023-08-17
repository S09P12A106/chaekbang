import React from 'react'
import styled from 'styled-components'

/*
- isOpen : modal의 open 여부 state
- width : modal의 가로 크기 (rem)
*/
const Modal = ({ isOpen, width, children }) => {
  return (
    <div>
      {isOpen && (
        <div>
          <ModalBackdrop></ModalBackdrop>
          <ModalContainer $width={width}>
            <div>{children}</div>
          </ModalContainer>
        </div>
      )}
    </div>
  )
}

const ModalContainer = styled.div`
  /* 모달창 크기 */
  width: ${(props) => props.$width};
  /* height: 35rem; */

  /* 최상단 위치 */
  z-index: 999;

  /* 중앙 배치 */
  /* top, bottom, left, right 는 브라우저 기준으로 작동한다. */
  /* translate는 본인의 크기 기준으로 작동한다. */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* 모달창 디자인 */
  background-color: #ffffff;
  border-radius: 0.5rem;
`

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(147, 147, 147, 0.75);
  z-index: 998; /* 모달보다 뒤에 위치하도록 설정 */
`

export default Modal
