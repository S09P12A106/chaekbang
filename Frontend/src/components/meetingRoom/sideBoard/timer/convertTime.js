// 입력한 시간(시,분,초)를 초(second)단위로 변환
export function convertSecond({ hours, minutes, seconds }) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds
  return totalSeconds
}

// 받아온 초(second)단위의 시간을 시 분 초로 변환
export function convertTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return [hours, minutes, seconds]
}
