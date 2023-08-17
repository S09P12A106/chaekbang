import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import COLORS from '../../constants/colors'
import YTLOGO from '../../assets/YTLOGO.png'

function MainFooter() {
  return (
    <Footer>
      <Footerbar>
        <P>책방 Chaek-Bang</P>
        <hr />
        <Imf>
          서울특별시 강남구 역삼동 테헤란로 212. 멀티캠퍼스 역삼 | 1544-9001
        </Imf>
        <Imf>Copyright 2023. Team Junit6. Ltd. All rights reserved.</Imf>
        <br />
        <ServiceContainer>
          <ul>
            <li>약관</li>
            <li>개인정보 보호</li>
            <li>고객 문의</li>
            <li>
              <img src={YTLOGO} />
            </li>
          </ul>
        </ServiceContainer>
      </Footerbar>
    </Footer>
  )
}

const Footer = styled.div`
  padding: 30px;
  background-color: ${COLORS.BRIGHTGREY};
  margin-top: 30px;
  hr {
    width: 150px;
    margin: 8px 0px;
  }

  br {
    margin: 8px 0px;
  }
`

const Footerbar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const P = styled.div`
  font-size: 20px;
  color: ${COLORS.BRIGHTBLACK};
`

const Imf = styled.div`
  color: ${COLORS.BRIGHTBLACK};
`

const ServiceContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${COLORS.BRIGHTBLACK};

  ul {
    display: flex;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      margin-right: 5px;

      /* 약관 구분자 스타일 */
      &::before {
        content: '|';
        margin: 0px 5px 3px 2px;
        color: ${COLORS.BRIGHTBLACK};
      }

      /* 첫 번째 약관 요소의 구분자 제거 */
      &:first-child::before {
        content: '';
      }

      img {
        height: 20px;
        width: auto;
        margin-right: 10px;
      }
    }
  }
`

export default MainFooter
