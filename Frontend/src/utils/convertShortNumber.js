// 숫자를 입력 받아 k 단위로 바꾸는 함수.
// String 값을 리턴(k가 안니올 수 있기에)
export default function convertShortNumber(inputNumber) {
  if (inputNumber < 1000) {
    return inputNumber.toString()
  }
  const divide = inputNumber / 1000
  let result = Math.floor(divide * 10) / 10
  return (result += 'k')
}
