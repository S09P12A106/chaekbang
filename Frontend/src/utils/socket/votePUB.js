export const votePUB = (client) => {
  client.current.publish({
    destination: `/ws/pub/meeting/1/vote/hello`,
  })
}
