import React from 'react'
import styled from 'styled-components'
import LogoImage from '../../assets/로고.png'
import NameImage from '../../assets/이름.png'
import { Link } from 'react-router-dom'

function LogoImg({ marginButtonRem = 0 }) {
  return (
    <div>
      <Logo marginbuttonrem={marginButtonRem}>
        <Link to="/">
          <StyledLogo src={LogoImage} />
        </Link>
        <Link to="/">
          <StyledName src={NameImage} />
        </Link>
      </Logo>
    </div>
  )
}

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.marginbuttonrem}rem;
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
  }
`

const StyledLogo = styled.img`
  width: 8.8rem;
  height: 5.3rem;
`
const StyledName = styled.img`
  width: 5.8rem;
  height: 3rem;
  margin: auto;
`

export default LogoImg
