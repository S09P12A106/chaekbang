import React from 'react'
import COLORS from '../../constants/colors'
import styled from 'styled-components'

function InputCompo({
  id,
  type = 'text',
  placeholder = 'placeholder',
  label = '',
  value,
  callback,
}) {
  return (
    <Container>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={callback}
      />
    </Container>
  )
}

const Container = styled.div``
const Input = styled.input`
  width: 100%;
  height: 3rem;
  font-size: 1rem;
  padding: 0 1.25rem 0 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid;
  border-color: ${COLORS.BLACK};
  ::placeholder {
    color: ${COLORS.GREY};
  }
  :focus {
  }
`

export default InputCompo
