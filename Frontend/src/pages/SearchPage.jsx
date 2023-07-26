import React, { useEffect, useState } from 'react'
import Banner from '../components/main/Banner'
import styled from 'styled-components'
import SearchInputBlock from '../components/search/SearchInputBlock'
import SearchGroupList from '../components/search/SearchGroupList'
import { getTagsApi } from '../api/searchApi'
import MainLayout from '../components/Layout/MainLayout'
const Container = styled.div``

function SearchPage() {
  const [tags, setTags] = useState([])
  useEffect(() => {
    async function getTags() {
      // const data = await getTagsApi()
      // setTags(data)
    }
    getTags()
  }, [])
  return (
    <MainLayout>
      <Container>
        <Banner></Banner>
        <SearchInputBlock tags={tags}></SearchInputBlock>
        <SearchGroupList></SearchGroupList>
      </Container>
    </MainLayout>
  )
}

export default SearchPage
