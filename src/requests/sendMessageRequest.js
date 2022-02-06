const sendMessageRequest = async (event, callback) => {
  try {
    const { chats, activeChat, token } = { ...event }
    const message = chats.find((ch) => ch.chatId === activeChat).typingMessage
    const response = await fetch("/SENDMESSAGE", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
      body: JSON.stringify({ message, activeChat }),
    })
    const answer = await response.json()
    return callback({ type: "OK", ...answer })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default sendMessageRequest
