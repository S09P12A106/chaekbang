import { jwtBackApiInstance } from './http'

const jwtHttp = jwtBackApiInstance()

// const getMeetingDetail = async (groupId, meetingId) => {
//   const response = await jwtHttp.get(
//     `/api/groups/${groupId}/meetings/${meetingId}`,
//   )
//   return response
// }

const getMeetingDetail = async (groupId, meetingId) => {
  const response = {
    message: '메메메메ㅔ멤셋세ㅔ셋지',
    data: {
      title: '말포이의 관점에서 바라본 해리포터',
      startedAt: '2023-07-23 12:00',
      closedAt: '2023-07-23 13:00',
      participation: [
        {
          userId: 1,
          nickname: '김주현',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
        {
          userId: 2,
          nickname: '조인혁',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
        {
          userId: 3,
          nickname: '오주영',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
        {
          userId: 4,
          nickname: '윤경민',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
        {
          userId: 5,
          nickname: '김보경',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
        {
          userId: 6,
          nickname: '이은석',
          profileImageUrl:
            'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
        },
      ],
      opinionBoxes: [
        {
          opinionBoxId: 1,
          topic: '셧업 말포이를 들었을 대의 말포이의 심정은?',
          opinions: [
            {
              userId: 1,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion: '그 때부터 해리포터와 갈라서는 분위기인 것 같습니다.',
            },
            {
              userId: 2,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '말포이의 인사말이 다소 거칠었기 때문에 약간 후회하지 않을까 생각합니다.',
            },
            {
              userId: 3,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion: '닥쳐 말포이!!!',
            },
          ],
        },
        {
          opinionBoxId: 2,
          topic: '다음 모임 때 읽고 싶은 책은?',
          opinions: [
            {
              userId: 1,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '무슨 책을 읽어볼까요오오오옹??????책조아좋아책조아좋아책조아좋아책조아좋아',
            },
            {
              userId: 2,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '바나프레소, 스타벅스, 냠냠, 쩝쩝, 쩝쩝충, 보관함1, 보관함2, 해리포터, 반지의 제왕',
            },
            {
              userId: 3,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '아무 말이나 적고 있습니다. 저는 아무 생각이 없습니다. 아무거나 읽으시는게 어떠실까여',
            },
            {
              userId: 4,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion: '혐오하지 않을 수 없습니다. 프론트.',
            },
            {
              userId: 5,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '자바스크립트는 정말로 죽이고 싶습니다. 살자 충동이 듭니다.',
            },
            {
              userId: 6,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '끼야아먼ㅇ라;ㅣㅁㄴ아ㅓㄹ;ㅣㅏㅁㄴ얼;ㅏㅣㅁㄴ어리;멍;ㅏㅣ너라;ㅁㄴㅇ;ㅏ;럼ㄴ어ㅏㅣㄹ;ㅁㄴ아ㅣ러ㅏㅁㄴ아ㅓㅣ;',
            },
          ],
        },
        {
          topic: '토픽토픽!!!ㅌ따삑따ㅃ삑!!!토토토토토토픽토핑',
          opinions: [
            {
              userId: 1,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '무슨 책을 읽어볼까요오오오옹??????책조아좋아책조아좋아책조아좋아책조아좋아',
            },
            {
              userId: 2,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '바나프레소, 스타벅스, 냠냠, 쩝쩝, 쩝쩝충, 보관함1, 보관함2, 해리포터, 반지의 제왕',
            },
            {
              userId: 3,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '아무 말이나 적고 있습니다. 저는 아무 생각이 없습니다. 아무거나 읽으시는게 어떠실까여',
            },
            {
              userId: 4,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion: '혐오하지 않을 수 없습니다. 프론트.',
            },
            {
              userId: 5,
              profileImageUrl:
                'https://digitalchosun.dizzo.com/site/data/img_dir/2020/11/17/2020111780130_0.jpg',
              opinion:
                '자바스크립트는 정말로 죽이고 싶습니다. 살자 충동이 듭니다.',
            },
          ],
        },
      ],
    },
  }
  return response
}

export default getMeetingDetail
