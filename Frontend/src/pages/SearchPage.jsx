import React, { useCallback, useEffect, useRef, useState } from 'react'
import Banner from '../components/main/Banner'
import styled from 'styled-components'
import SearchInputBlock from '../components/search/SearchInputBlock'
import SearchGroupList from '../components/search/SearchGroupList'
import { getSearchGroupApi, getTagsApi } from '../api/searchApi'
import MainLayout from '../components/Layout/MainLayout'
import { useLocation } from 'react-router-dom'
import LoadingItem from '../components/common/LoadingItem'
const Container = styled.div``

function SearchPage() {
  const [tags, setTags] = useState(null)
  const [stop, setStop] = useState(false) // 마지막 데이터 까지 다 불러온 경우, 더 이상 요청 안보내게 함
  const [isLoaded, setIsLoaded] = useState(false) // 로딩 시 처리. (데이터 비동기)
  const [pageNum, setPageNum] = useState(0)
  const [groupList, setGroupList] = useState([])
  const [input, setInput] = useState('')

  const targetRef = useRef()
  const location = useLocation()

  let tagId = location.state === null ? null : location.state.tagId
  // 12개로 고정.
  const pageSize = 12

  const option = {
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
    setPageNum(0)
    let query
    if (input) {
      query = `pageNum=0&pageSize=12&keyword=${input}`
    } else if (tagId) {
      query = `pageNum=0&pageSize=12&tags=${tagId}`
    } else {
      query = `pageNum=0&pageSize=12&keyword=`
    }
    const response = await getSearchGroupApi(query)
    setGroupList(response.data)
    setPageNum(1)
    setStop(false)
  }
  const onHandlerKeyUp = (e) => {
    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  const observerHandler = useCallback(
    async (entries, observer) => {
      const target = entries[0]
      if (target.isIntersecting) {
        setPageNum((prev) => prev + 1)
        let initQuery
        if (input) {
          initQuery = `pageNum=${pageNum}&pageSize=${pageSize}&keyword=${input}`
        } else if (tagId) {
          initQuery = `pageNum=${pageNum}&pageSize=${pageSize}&tags=${tagId}`
        } else {
          initQuery = `pageNum=${pageNum}&pageSize=${pageSize}&keyword=`
        }

        const data = await getSearchGroupApi(initQuery)
        setGroupList((prev) => prev.concat(data.data))
        if (data.data.length < pageSize) {
          //페이지 사이즈보다 작은 경우 -> 마지막 데이터
          setStop(true)
        }
        observer.unobserve(targetRef.current)
      }
    },
    [pageNum],
  )

  useEffect(() => {
    if (stop) {
      return
    }
    const observer = new IntersectionObserver(observerHandler, option)
    if (targetRef.current) observer.observe(targetRef.current)
    return () => observer.disconnect()
  }, [observerHandler])

  // 페이지 시작시, 초기 데이터 받아오고 obser 시작.
  useEffect(() => {
    async function getTags() {
      const data = await getTagsApi()
      setTags(data.data)
    }
    getTags()
  }, [])
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
        <div ref={targetRef}></div>
      </Container>
    </MainLayout>
  )
}

export default SearchPage
