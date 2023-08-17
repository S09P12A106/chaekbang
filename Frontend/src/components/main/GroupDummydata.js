export const getSingleGroup = (title, tagsLength) => {
  const tags = []
  for (let i = 1; i <= tagsLength; i++) {
    tags.push({
      tagId: i,
      tag: '인문학',
    })
  }
  return {
    id: 1,
    title,
    imageUrl: 'https://avatars.githubusercontent.com/u/28949213?v=4',
    userCount: 20,
    viewCount: 3523,
    tags: tags,
  }
}

export const getListGroup = (length) => {
  const arr = []
  for (let i = 1; i <= length; i++) {
    let tagLen = i > 5 ? 3 : i
    arr.push(getSingleGroup('그룹이름', tagLen))
  }
  shuffle(arr)
  return arr
}
function shuffle(array) {
  array.sort(() => Math.random() - 0.5)
}
