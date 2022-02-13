const createGroupChatRequest = async (event, callback) => {
  try {
    const { groupChatData, token, myName } = { ...event }
    const response = await fetch("/CREATEGROUPCHAT", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token,
      },
      method: "POST",
      body: JSON.stringify({ groupChatData, myName }),
    })
    const answer = await response.json()
    return callback({ type: "SUCCSESS", ...answer })
  } catch (error) {
    callback("NETWORKERROR")
  }
}

export default createGroupChatRequest
