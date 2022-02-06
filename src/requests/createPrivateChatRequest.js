const createPrivateChatRequest = async (event, callback) => {
  try {
    const { message, activeContact, token, myName } = { ...event }
    const response = await fetch("/CREATEPRIVATECHAT", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
      body: JSON.stringify({ message, activeContact, myName }),
    })
    const answer = await response.json()
    return callback({ type: "SUCCESS", insertedId: answer.insertedId })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default createPrivateChatRequest
