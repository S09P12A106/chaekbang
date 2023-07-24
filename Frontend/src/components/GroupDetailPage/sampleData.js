const sampleMenus = ['상세 정보', '인원 정보']

const sampleGroupMembers = {
  users: [
    {
      nickname: 'IRON MAN',
      profileImageUrl: 'https://source.boringavatars.com/beam/50',
      participatedCount: 5,
    },
    {
      nickname: 'Captin America',
      profileImageUrl: 'https://source.boringavatars.com/beam/50',
      participatedCount: 12,
    },
    {
      nickname: 'Spiderman',
      profileImageUrl: 'https://source.boringavatars.com/beam/50',
      participatedCount: 8,
    },
    {
      nickname: 'Black Widow',
      profileImageUrl: 'https://source.boringavatars.com/beam/50',
      participatedCount: 9,
    },
    {
      nickname: 'Hawk Eye',
      profileImageUrl: 'https://source.boringavatars.com/beam/50',
      participatedCount: 4,
    },
  ],
}

const groupMarvel = {
  title: '마블을 사랑하는 모임',
  detail:
    '마블의 개성넘치는 캐릭터, 그들의 상상을 초월하는 능력, 멋있지 않습니까? 그들은 어떤 생각을 가졌으며 앞으로 어떻게 활동을 이어나가게 될까요? 저희 마사모에서 같이 이야기 나누어보시죠!',
  opened: true, // 바꿔보기
  deleted: false,
  readCount: 10,
  // imageUrl: 'james-resource/img/marvel_img_1.jpg',
  // imageUrl: '../src/assets/GroupDetailPage/img/GROUP_IMG.jpg',
  imageUrl: 'https://weekly.chosun.com/news/photo/201804/12924_1.jpg',
  question:
    '당신의 마블의 최애 캐릭터는 누구인가요? 그 캐릭터를 좋아하게 된 이유도 이야기해주세요.',
  leader: {
    nickname: 'IRON MAN',
    // profileImageUrl: 'james-resource/img/marvel_img_2.jpg',
    profileImageUrl:
      'https://m.7ing.co.kr/web/product/big/202206/89216c19a8cabbca4782c61da664e13c.jpg',
    aboutMe:
      '마사모의 리더, 캡틴 아메리카입니다. 제가 가장 좋아하는 대사인 "I can do this all day" 처럼 이 모임에 진심이고 여러분과 같이 마블의 세계로 빠져들 준비가 항상 되어있습니다..! 내가 마블 덕후다?! 망설이지 말고 들어오세요!!',
  },
  tags: [
    {
      tagName: '마블',
    },
    {
      tagName: '아이언맨',
    },
    {
      tagName: '캡틴아메리카',
    },
  ],
}

const groupMemberCount = 10

export { sampleMenus, sampleGroupMembers, groupMarvel, groupMemberCount }
