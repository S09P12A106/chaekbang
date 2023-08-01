export const getSingleAppliedMember = (userId, nickname, gender) => {
  return {
    userId: userId,
    nickname: nickname,
    profileImageUrl:
      'https://img.khan.co.kr/news/2023/05/12/news-p.v1.20230512.e5fffd99806f4dcabd8426d52788f51a_P1.webp',
    email: 'ssafy1234@gmail.com',
    gender: gender,
    answer: '너무 가입하고 싶었어어ㅓ어어엉ㅇ!!히히히히힣ㅇ',
  }
}

export const getListAppliedMember = () => {
  const arr = []
  arr.push(getSingleAppliedMember(1, '야야야야놀자', 'M'))
  arr.push(getSingleAppliedMember(2, '나는김싸피', 'F'))
  arr.push(getSingleAppliedMember(3, '호텔스컴바인', 'M'))
  arr.push(getSingleAppliedMember(4, '휴휴휴휴지', 'M'))
  arr.push(getSingleAppliedMember(5, '책을읽자', 'F'))
  arr.push(getSingleAppliedMember(6, '냐아아아아옹', 'F'))
  arr.push(getSingleAppliedMember(7, '유후우유', 'F'))
  arr.push(getSingleAppliedMember(8, 'SpringSummer', 'F'))
  arr.push(getSingleAppliedMember(9, 'AutumnWinter', 'M'))
  return arr
}
