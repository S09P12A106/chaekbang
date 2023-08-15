function findLeader(members, leaderId) {
  return members.filter((user) => user.id === leaderId)[0]
}

export { findLeader }
