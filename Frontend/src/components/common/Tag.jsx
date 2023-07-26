/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import styled from 'styled-components'
import COLORS from '../../constants/colors'

const Container = styled.div`
  display: inline-block;
  background-color: ${(props) =>
    props.$active ? COLORS.THEME_COLOR2 : COLORS.WHITE};
  color: ${(props) => (props.$active ? COLORS.WHITE : COLORS.THEME_COLOR2)};
  font-size: 0.7rem;

  padding: 3px 10px 3px 8px;
  border-radius: 11px;
  text-align: center;
  box-shadow:
    -1px -1px 2px rgba(228, 226, 226, 0.8),
    1px 2px 2px rgba(0, 0, 0, 0.2);

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`

function Tag({ value }) {
  const [active, setActive] = useState(false)
  const text = `#${value}`
  return (
    <Container $active={active} onClick={() => setActive(!active)}>
      {text}
    </Container>
  )
}

export default Tag
