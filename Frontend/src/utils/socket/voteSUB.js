export const voteSUB = (client, callback, meetingId) => {
  client.current.subscribe(`/topic/meeting/${meetingId}/vote`, (message) => {
    const getVoteInfo = JSON.parse(message.body)
    callback(getVoteInfo)
  })
}
