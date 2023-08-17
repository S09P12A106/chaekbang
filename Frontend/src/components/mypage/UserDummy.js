export const getUser = () => {
  return {
    nickname: '나옹이다옹',
    email: 'thisIsEmail@email.com',
    profileImageUrl:
      'https://cdn.daily.hankooki.com/news/photo/202205/828619_1097303_1332.jpg',
    gender: 'M',
    birthDate: new Date('2000-01-01'),
    myGroup: [
      {
        groupId: 1,
        title: '톡톡 사이언스',
        imageUrl:
          'https://cdn.metakr.co.kr/news/photo/202306/2632_4989_515.jpg',
      },
      {
        groupId: 2,
        title: '소셜적 순간',
        imageUrl:
          'https://cdn.spotvnews.co.kr/news/photo/202304/599630_832577_5535.jpg',
      },
    ],
    groupHistory: [
      {
        groupId: 3,
        title: '강남구 책모임',
        imageUrl:
          'https://cdn.metakr.co.kr/news/photo/202306/2632_4989_515.jpg',
      },
      {
        groupId: 4,
        title: '강동구 책모임',
        imageUrl:
          'https://cdn.spotvnews.co.kr/news/photo/202304/599630_832577_5535.jpg',
      },
    ],
  }
}
