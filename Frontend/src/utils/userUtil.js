import CONSOLE from './consoleColors'

/**
 * 그룹 멤버를 배열로 받아 현재 로그인한 유저가 그룹에 가입하지 않은 유저라면 홈페이지로 이동시킵니다.
 * @param {Array} groupMembers
 * @return {boolean}
 */
function isUserNotInGroup(groupMembers, loggedInUser) {
  return !groupMembers.some((member) => member.id === loggedInUser.userId)
}

export { isUserNotInGroup }
