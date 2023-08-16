export const emojiSUB = (client, callback) => {
  client.current.subscribe(`/topic/meeting/1/emoji`, (message) => {
    const getEmojiInfo = JSON.parse(message.body)
    callback(getEmojiInfo)
    console.log('emojiSUB!!!!!!!!!!!!!!!!!')
  })
}
