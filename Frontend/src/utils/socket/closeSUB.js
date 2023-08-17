export const closeSUB = (client, callback) => {
  client.current.subscribe(`/topic/meeting/1/noti`, (message) => {
    const getClosedInfo = JSON.parse(message.body)
    callback(getClosedInfo)
  })
}
