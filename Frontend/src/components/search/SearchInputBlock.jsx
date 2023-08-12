import React from 'react'
import styled from 'styled-components'
import SearchIcon from '../../assets/SearchIcon.svg'
import COLORS from '../../constants/colors'
import TagBlock from './TagBlock'

const Container = styled.div`
  max-width: 600px;
  margin: 30px auto;
`
const InputBlock = styled.div`
  width: 80%;
  height: 50px;
  margin: 0 auto;
  border: solid ${COLORS.GREY_BOARD} 2px;
  border-radius: 40px;
  box-shadow:
    -1px -1px 2px rgba(228, 226, 226, 0.8),
    1px 2px 2px rgba(0, 0, 0, 0.2);
`
const SearchIconBtn = styled.button`
  width: 15%;
  height: 100%;
  border: 0px;
  background-color: ${COLORS.WHITE};
  outline: none;

  border-left: solid ${COLORS.GREY_BOARD} 2px;

  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  img {
    display: block;
    margin: auto;
  }
`
const CustomInput = styled.input`
  width: 85%;
  height: 100%;
  font-size: 16px;
  border: 0px;
  float: left;
  padding: 0px 20px 0px 20px;
  outline: none;
  color: ${COLORS.GREY};
  border-radius: 40px;
`
function SearchInputBlock({ tags, keyUp, submit, input, onChange }) {
  return (
    <Container>
      <InputBlock>
        <CustomInput
          placeholder="검색어를 입력해주세요"
          value={input}
          onKeyUp={keyUp}
          onChange={onChange}
        />
        <SearchIconBtn onClick={submit}>
          <img src={SearchIcon} alt="search icon" />
        </SearchIconBtn>
      </InputBlock>
      <TagBlock tags={tags} />
    </Container>
  )
}

export default SearchInputBlock
