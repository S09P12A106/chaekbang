export const getSingleJoinedMember = (userId, nickname, gender) => {
  return {
    userId: userId,
    nickname: nickname,
    profileImageUrl:
      'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.webp',
    email: 'ssafy1234@gmail.com',
    gender: gender,
  }
}

export const getListJoinedMember = () => {
  const arr = []
  arr.push(getSingleJoinedMember(1, '야야야야놀자', 'M'))
  arr.push(getSingleJoinedMember(2, '나는김싸피', 'F'))
  arr.push(getSingleJoinedMember(3, '호텔스컴바인', 'M'))
  arr.push(getSingleJoinedMember(4, '휴휴휴휴지', 'M'))
  arr.push(getSingleJoinedMember(5, '책을읽자', 'F'))
  arr.push(getSingleJoinedMember(6, '냐아아아아옹', 'F'))
  arr.push(getSingleJoinedMember(7, '유후우유', 'F'))
  arr.push(getSingleJoinedMember(8, 'SpringSummer', 'F'))
  arr.push(getSingleJoinedMember(9, 'AutumnWinter', 'M'))
  return arr
}
