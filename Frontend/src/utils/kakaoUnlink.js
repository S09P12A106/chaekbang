export function kakaoUnlink() {
  Kakao.API.request({
    url: '/v1/user/unlink',
  })
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })
}
