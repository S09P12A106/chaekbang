import React from 'react'
import Tag from '../common/Tag'
import styled from 'styled-components'
import SkletonItem from '../common/SkletonItme'

const TagsBlock = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    margin-top: 5px;
    margin-right: 10px;
  }
`
const SkletonTagBlock = styled.div`
  margin: 0 auto;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  div {
    margin-top: 5px;
    margin-right: 10px;
  }
`
const SkletonTag = styled(SkletonItem)`
  width: 50px;
  height: 25px;
`

function TagBlock({ tags }) {
  return (
    <div>
      {tags == null ? (
        <SkletonTagBlock>
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
          <SkletonTag />
        </SkletonTagBlock>
      ) : (
        <TagsBlock>
          {tags.map((tag, index) => (
            <Tag
              value={{ tagName: tag.tagName, tagId: tag.tagId }}
              key={index}
            ></Tag>
          ))}
        </TagsBlock>
      )}
    </div>
  )
}

export default React.memo(TagBlock)
