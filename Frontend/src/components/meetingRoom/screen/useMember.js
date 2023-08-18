export function useMember(number) {
  // 1명
  if (number === 0 || number === 1) {
    return { value1: 1, value2: 1 }
  }
  // 2명
  else if (number === 2) {
    return { value1: 1, value2: 2 }
  }
  // 3~4명
  else if (number <= 4) {
    return { value1: 2, value2: 2 }
  }
  // 5~6명
  else if (number <= 6) {
    return { value1: 2, value2: 3 }
  }
  // 7~9명
  else if (number <= 9) {
    return { value1: 3, value2: 3 }
  }
  // 10~12명
  else if (number <= 12) {
    return { value1: 3, value2: 4 }
  } else {
    return { value1: 0, value2: 0 }
  }
}
