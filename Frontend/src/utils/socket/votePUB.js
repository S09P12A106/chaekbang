export const votePUB = (client, meetingId) => {
  client.current.publish({
    destination: `/ws/pub/meeting/${meetingId}/vote/hello`,
  })
}
