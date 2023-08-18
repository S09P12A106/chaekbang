import React, { useCallback, useEffect, useRef, useState } from 'react'
import Banner from '../components/main/Banner'
import styled from 'styled-components'
import SearchInputBlock from '../components/search/SearchInputBlock'
import SearchGroupList from '../components/search/SearchGroupList'
import { getSearchGroupApi, getTagsApi } from '../api/searchApi'
import MainLayout from '../components/Layout/MainLayout'
import { useLocation } from 'react-router-dom'
import LoadingItem from '../components/common/LoadingItem'
import CONSOLE from '../utils/consoleColors'
const Container = styled.div``

function SearchPage() {
  const [tags, setTags] = useState(null)
  const [stop, setStop] = useState(false) // 마지막 데이터 까지 다 불러온 경우, 더 이상 요청 안보내게 함
  const [isLoaded, setIsLoaded] = useState(false) // 로딩 시 처리. (데이터 비동기)
  // const [pageNum, setPageNum] = useState(0)
  const pageNum = useRef(-1)
  const isSearchOptionChanged = useRef(false)
  const [groupList, setGroupList] = useState([])
  const [input, setInput] = useState('')

  const targetRef = useRef()
  const location = useLocation()

  let tagId = location.state === null ? null : location.state.tagId
  // 12개로 고정.
  const PAGE_SIZE = 12

  const intersectionOption = {
    root: null,
    rootMargin: '1px',
    threshold: 1.0,
  }

  const onChange = useCallback(
    (e) => {
      setInput(e.target.value)
    },
    [input],
  )

  // input 창 핸들링 작업
  const onSubmit = async () => {
    pageNum.current = 0
    setStop(false)
    isSearchOptionChanged.current = true
    setIsLoaded(true)
  }
  const onHandlerKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  // <설정> meetings 데이터가 변경될시
  useEffect(() => {
    setIsLoaded(false)
    pageNum.current++
  }, [groupList])

  // <설정> isLoaded가 true이면 데이터를 받아온다.
  useEffect(() => {
    if (isLoaded) {
      let initQuery
      if (input) {
        initQuery = `pageNum=${pageNum.current}&pageSize=${PAGE_SIZE}&keyword=${input}`
      } else if (tagId) {
        initQuery = `pageNum=${pageNum.current}&pageSize=${PAGE_SIZE}&tags=${tagId}`
      } else {
        initQuery = `pageNum=${pageNum.current}&pageSize=${PAGE_SIZE}&keyword=`
      }

      getSearchGroupApi(initQuery)
        .then(({ data }) => {
          if (data.length < PAGE_SIZE) {
            //페이지 사이즈보다 작은 경우 -> 마지막 데이터
            setStop(true)
          }
          if (isSearchOptionChanged.current) {
            isSearchOptionChanged.current = false
            setGroupList(data)
          } else {
            setGroupList((prev) => prev.concat(data))
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [isLoaded])

  // 1. 초기 데이터를 가져온다.
  useEffect(() => {
    // 모임들 가져오기
    setIsLoaded(true)

    // 인기 태그
    async function getTags() {
      const data = await getTagsApi()
      setTags(data.data)
    }
    getTags()
  }, [])

  // 2. 감지할 시 실행될 콜백함수 정의
  const onIntersect = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target)
      // 데이터 불러오기
      setIsLoaded(true)
      observer.observe(entry.target)
    }
  }

  // 3. IntersectionObserver 설정
  useEffect(() => {
    let observer
    if (targetRef.current && !stop) {
      observer = new IntersectionObserver(onIntersect, intersectionOption)
      observer.observe(targetRef.current)
    }
    return () => observer && observer.disconnect()
  }, [isLoaded, stop])

  if (!groupList) {
    return <LoadingItem></LoadingItem>
  }
  return (
    <MainLayout>
      <Container>
        <Banner></Banner>
        <SearchInputBlock
          tags={tags}
          input={input}
          keyUp={onHandlerKeyUp}
          submit={onSubmit}
          onChange={onChange}
        ></SearchInputBlock>
        <SearchGroupList groups={groupList}></SearchGroupList>
        {!isLoaded && <div ref={targetRef}></div>}
      </Container>
    </MainLayout>
  )
}

export default SearchPage
