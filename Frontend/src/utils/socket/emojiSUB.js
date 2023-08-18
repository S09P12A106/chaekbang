export const emojiSUB = (client, callback, meetingId) => {
  client.current.subscribe(`/topic/meeting/${meetingId}/emoji`, (message) => {
    const getEmojiInfo = JSON.parse(message.body)
    callback(getEmojiInfo)
  })
}
