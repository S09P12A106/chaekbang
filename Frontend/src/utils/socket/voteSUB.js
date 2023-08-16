export const voteSUB = (client, callback) => {
  client.current.subscribe(`/topic/meeting/1/vote`, (message) => {
    const getVoteInfo = JSON.parse(message.body)
    callback(getVoteInfo)
    console.log('voteSUB!!!!!!!!!!!!!!!!!')
    console.log(getVoteInfo)
  })
}
